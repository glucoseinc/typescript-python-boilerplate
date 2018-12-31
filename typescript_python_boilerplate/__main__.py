from __future__ import annotations

import os
from typing import TYPE_CHECKING

import click

from .logging import init_logging
from .webapp import webapp

if TYPE_CHECKING:
    from typechecking import Iterator, List, Optional


@click.group()
@click.option('--debug/--no-debug', default=False)
@click.pass_context
def cli(ctx: click.Context, debug: bool):
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug

    init_logging(debug)


@cli.command()  # @cli, not @click!
@click.option('--servce-static', is_flag=True, default=None)
@click.pass_context
def run(ctx: click.Context, servce_static: Optional[bool] = None):
    debug = ctx.obj['DEBUG']
    if servce_static is None:
        servce_static = debug

    if debug:
        # debug時はmanifest.jsonの更新でも再起動するように
        patch_reloader([
            os.path.abspath('./static/manifest.json')
        ])

    # service static files
    if servce_static:
        webapp.static('/static', './static')

    webapp.run(
        host='0.0.0.0', port=8000,
        debug=debug,
    )


def patch_reloader(my_files: List[str]) -> Iterator[str]:
    """
    sanicのreloaderにpatchをあてて、このアプリ用のファイルも監視するようにする

    Args:
        my_files: 追加で監視するファイルのリスト
    """
    from sanic import reloader_helpers

    old_iter_module_files = reloader_helpers._iter_module_files

    def _my_iter_module_files():
        for x in old_iter_module_files():
            yield x
        for x in my_files:
            yield x

    reloader_helpers._iter_module_files = _my_iter_module_files
