from __future__ import annotations

from contextlib import asynccontextmanager

import aioredis
from aioredis.pubsub import Receiver

CHAT_CHANNEL = 'chat_channel'


class App:
    redis: aioredis.Redis

    @classmethod
    async def create(cls, redis_url):
        # connect to redis
        redis = await aioredis.create_redis_pool(redis_url, timeout=10)
        return cls(redis)

    def __init__(self, redis: aioredis.Redis):
        self.redis = redis

    @asynccontextmanager
    async def subscribe_chat(self):
        redis_for_pubsub = await aioredis.create_redis(self.redis.address, db=self.redis.db)
        receiver = Receiver()

        channel = receiver.channel(CHAT_CHANNEL)
        await redis_for_pubsub.subscribe(channel)

        async def _get():
            return (await receiver.get())[1]

        yield channel, _get

        await redis_for_pubsub.unsubscribe(CHAT_CHANNEL)
