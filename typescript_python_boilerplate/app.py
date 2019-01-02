from __future__ import annotations

import aioredis


class App:
    redis: aioredis.Redis

    @classmethod
    async def create(cls, redis_url):
        # connect to redis
        redis = await aioredis.create_redis_pool(redis_url, timeout=10)
        return cls(redis)

    def __init__(self, redis: aioredis.Redis):
        self.redis = redis
