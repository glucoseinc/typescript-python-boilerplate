from sanic import Sanic

from .template import init_jinja2_template


def create_webapp():
    webapp = Sanic('typescript_python_boilerplate', configure_logging=False)
    init_jinja2_template(webapp)

    return webapp

__all__ = ('create_webapp',)
