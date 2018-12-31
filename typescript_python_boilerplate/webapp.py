import json

from sanic import Sanic

from .template import init_jinja2_template


def create_webapp():
    webapp = Sanic('typescript_python_boilerplate', configure_logging=False)
    init_jinja2_template(webapp)

    # load manifest json
    with open('./static/manifest.json') as fp:
        manifest = json.load(fp)

    webapp.jinja_env.globals.update(MANIFEST=manifest)

    return webapp


webapp = create_webapp()

__all__ = ('webapp',)
