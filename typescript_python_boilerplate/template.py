"""
jinja2 template関連
"""
from __future__ import annotations

import asyncio
import functools
import os
from typing import TYPE_CHECKING, cast

from jinja2 import Environment, FileSystemLoader

from sanic.response import html
from sanic.views import HTTPMethodView

if TYPE_CHECKING:
    from typing import Any, Mapping

    from sanic import Sanic
    from sanic.request import Request
    from sanic.response import HTTPResponse


def init_jinja2_template(app: Sanic) -> None:
    app.jinja_env = env = Environment(enable_async=True)
    env.loader = FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates'))
    env.globals.update(url_for=app.url_for)


def get_jinja_env_from_app(app: Sanic) -> Environment:
    return cast(Environment, app.jinja_env)


async def render_template(
    request: Request, template: str, status: int = 200, headers: Mapping[str, str] = None, **context: Any
) -> HTTPResponse:
    env = get_jinja_env_from_app(request.app)
    body = await env.get_template(template).render_async(**context)
    return html(body, status=status, headers=headers)


def templated(template: str, status: int = 200, headers: Mapping[str, str] = None):
    """templateを使う関数向けのdecorator

    使い方
    ```
    @webapp.route('/')
    @templated('index.html')
    def index(request):
        return {'hello': 'world'}
    ```

    """

    def wrapper(f):
        @functools.wraps(f)
        async def wrapped(*args, **kwargs):
            if asyncio.iscoroutinefunction(f):
                context = await f(*args, **kwargs)
            else:
                context = f(*args, **kwargs)

            # get request from args
            request = args[1 if isinstance(args[0], HTTPMethodView) else 0]
            return await render_template(request, template, status, headers, **(context or {}))

        return wrapped

    return wrapper
