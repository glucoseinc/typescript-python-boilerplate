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

    from ..interoperability import SendChatEventActionPayload

WAIT_TIMEOUT = 5

CHAT_LOG = 'chat_log'
MAX_CHAT_LOG = 1000


@bp.websocket('/ws')
async def websocket(request: Request, ws: WebSocket) -> None:
    logger.info('WebSocket connected')
    app = request.app.app
    receiver = asyncio.ensure_future(ws.recv())

    # send chat history
    chat_log = await app.redis.lrange(CHAT_LOG, 0, MAX_CHAT_LOG) or []
    chat_log = list(map(lambda x: json.loads(x), chat_log))

    await ws.send(make_server_action(WSServerActionType.REPLACE_CHAT_LOG, {'log': chat_log}))

    try:
        while True:
            dones, pendings = await asyncio.wait([receiver], timeout=WAIT_TIMEOUT, return_when=asyncio.FIRST_COMPLETED)

            for done in dones:
                if done is receiver:
                    await receive_ws_message(app, ws, json.loads(receiver.result()))
                    receiver = asyncio.ensure_future(ws.recv())

            # await ws.send(json.dumps({'hello': 'world'}))
            # await asyncio.sleep(5000)
    finally:
        receiver.cancel()


def make_server_action(action_type: WSServerActionType, payload: Any) -> str:
    return json.dumps({'type': action_type.value, 'payload': payload})


async def receive_ws_message(app: App, ws: WebSocket, message: dict) -> None:
    logger.debug('ws message: %r', message)
    validator.validate(message, schema='JSWebSocketClientMessage')

    action, payload = message['action'], message['payload']
    if action == WSClientActionType.SEND_CHAT_MESSAGE.value:
        await receive_send_chat_message_action(app, ws, payload)
    else:
        raise BadActionError('Unsupported client action "{}"'.format(action))


async def receive_send_chat_message_action(app: App, ws: WebSocket, payload: SendChatEventActionPayload) -> None:
    # add server id
    server_id = str(uuid.uuid4())
    payload['serverId'] = server_id

    # store
    x = await app.redis.lpush(CHAT_LOG, json.dumps(payload))
    logger.debug('sent %r', x)
