from __future__ import annotations

import importlib
import json
from typing import TYPE_CHECKING

from sanic import Sanic

from .template import init_jinja2_template

if TYPE_CHECKING:
    from typing import Optional


def create_webapp(dummy_manifest: Optional[dict] = None):
    """
    sanic appを作る

    Args:
        dummy_manifest: テスト用のmanifestファイル。テスト時のみ仕様。指定された場合、nodeが作るmanifest.jsonを読む代わりに、これを見る
    """
    webapp = Sanic('typescript_python_boilerplate', configure_logging=False)
    init_jinja2_template(webapp)

    # load manifest json
    webapp.jinja_env.globals.update(MANIFEST=load_manifest() if dummy_manifest is None else dummy_manifest)

    # register blueprints
    for module, url_prefix in [('.api', '/api'), ('.public', '/')]:
        mod = importlib.import_module(module, __name__.split('.')[0])
        webapp.blueprint(mod.bp, url_prefix=url_prefix)

    return webapp


def load_manifest():
    with open('./static/manifest.json') as fp:
        manifest = json.load(fp)
    return manifest


__all__ = ('create_webapp', 'load_manifest')
