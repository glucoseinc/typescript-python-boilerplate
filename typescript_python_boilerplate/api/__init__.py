from sanic import Blueprint


bp = Blueprint('api')

# load views
from . import views  # noqa

__all__ = ('bp',)
