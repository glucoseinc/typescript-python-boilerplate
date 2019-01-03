from __future__ import annotations

import asyncio
import json
import uuid
from typing import TYPE_CHECKING

from . import bp
from ..app import App
from ..constants import WSClientActionType, WSServerActionType
from ..exceptions import BadActionError
from ..interoperability import validator
from ..logging import logger

if TYPE_CHECKING:
    from typing import Any

    from sanic.request import Request
    from websockets.protocol import WebSocketCommonProtocol as WebSocket

    from ..interoperability import JSSendChatEventActionPayload

WAIT_TIMEOUT = 5

CHAT_LOG = 'chat_log'
MAX_CHAT_LOG = 1000


@bp.websocket('/ws')
async def websocket(request: Request, ws: WebSocket) -> None:
    logger.info('WebSocket connected')
    app = request.app.app

    # send chat history
    chat_log = await app.redis.lrange(CHAT_LOG, 0, MAX_CHAT_LOG) or []
    chat_log = list(map(lambda x: json.loads(x), chat_log))

    await ws.send(make_server_action(WSServerActionType.REPLACE_CHAT_LOG, {'log': chat_log}))

    async with app.subscribe_chat() as (pubsub_channel, pubsub_get):
        ws_receiver = asyncio.ensure_future(ws.recv())
        pubsub_receiver = asyncio.ensure_future(pubsub_get())

        try:
            while True:
                dones, pendings = await asyncio.wait(
                    [ws_receiver, pubsub_receiver], timeout=WAIT_TIMEOUT, return_when=asyncio.FIRST_COMPLETED
                )

                for done in dones:
                    if done is ws_receiver:
                        ws_data, ws_receiver = ws_receiver.result(), asyncio.ensure_future(ws.recv())
                        await app.redis.publish(
                            pubsub_channel.name, await receive_ws_message(app, ws, json.loads(ws_data))
                        )
                    elif done is pubsub_receiver:
                        pubsub_data, pubsub_receiver = pubsub_receiver.result(), asyncio.ensure_future(pubsub_get())
                        logger.debug('pubsub: %r', pubsub_data)
                        await ws.send(make_server_action(WSServerActionType.APPEND_CHAT_EVENT, json.loads(pubsub_data)))

        finally:
            ws_receiver.cancel()
            pubsub_receiver.cancel()


def make_server_action(action_type: WSServerActionType, payload: Any) -> str:
    logger.debug('ws message send: %s %s', action_type, repr(payload)[:100] + '...')

    return json.dumps({'type': action_type.value, 'payload': payload})


async def receive_ws_message(app: App, ws: WebSocket, message: dict) -> str:
    logger.debug('ws message received: %r', message)
    validator.validate(message, schema='JSWebSocketClientMessage')

    action_type, payload = message['type'], message['payload']
    if action_type == WSClientActionType.SEND_CHAT_MESSAGE.value:
        return await receive_send_chat_message_action(app, ws, payload)
    else:
        raise BadActionError('Unsupported client action type "{}"'.format(action_type))


async def receive_send_chat_message_action(app: App, ws: WebSocket, payload: JSSendChatEventActionPayload) -> str:
    # add server id
    server_id = str(uuid.uuid4())
    payload['serverId'] = server_id

    # store
    data = json.dumps(payload)
    await app.redis.lpush(CHAT_LOG, data)
    return data
