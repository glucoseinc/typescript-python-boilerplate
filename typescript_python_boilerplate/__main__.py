from __future__ import annotations

from typing import TYPE_CHECKING

import click

from .app import App
from .logging import init_logging, logger
from .webapp import create_webapp, load_manifest

if TYPE_CHECKING:
    from typechecking import Optional


@click.group()
@click.option('--debug/--no-debug', default=False)
@click.pass_context
def cli(ctx: click.Context, debug: bool):
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug

    init_logging(debug)


@cli.command()  # @cli, not @click!
@click.option('--host', default='127.0.0.1')
@click.option('--port', default=8000, type=int)
@click.option('--redis-url', default='redis://redis/1')
@click.option('--servce-static', is_flag=True, default=None)
@click.pass_context
def run(ctx: click.Context, host: str, port: int, redis_url: str, servce_static: Optional[bool] = None):
    debug = ctx.obj['DEBUG']
    if servce_static is None:
        servce_static = debug

    webapp = create_webapp()

    if debug:
        # debug時はmanifest.jsonを毎回読み込むように
        @webapp.middleware('request')
        def inject_manifest(request):
            webapp.jinja_env.globals.update(MANIFEST=load_manifest())

    # service static files
    if servce_static:
        webapp.static('/static', './static')

    # register initialization func. this must run in event loop
    async def initialize_app():
        logger.info('Initialize typescript-python-boilerplate')
        app = await App.create(redis_url=redis_url)
        assert not hasattr(webapp, 'app')
        webapp.app = app

    webapp.add_task(initialize_app)

    # run server
    webapp.run(host=host, port=port, debug=debug)


# def patch_reloader(my_files: List[str]) -> Iterator[str]:
#     """
#     sanicのreloaderにpatchをあてて、このアプリ用のファイルも監視するようにする

#     Args:
#         my_files: 追加で監視するファイルのリスト
#     """
#     from sanic import reloader_helpers

#     old_iter_module_files = reloader_helpers._iter_module_files

#     def _my_iter_module_files():
#         for x in old_iter_module_files():
#             yield x
#         for x in my_files:
#             yield x

#     reloader_helpers._iter_module_files = _my_iter_module_files
