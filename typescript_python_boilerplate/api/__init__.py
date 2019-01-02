from sanic import Blueprint


bp = Blueprint('api')

# load views
from . import views, websocket  # noqa

__all__ = ('bp',)
