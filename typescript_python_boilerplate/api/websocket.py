from __future__ import annotations

import asyncio
import json

from . import bp


@bp.websocket('/ws')
async def websocket(request, ws):
    while True:
        await ws.send(json.dumps({'hello': 'world'}))
        await asyncio.sleep(5000)
