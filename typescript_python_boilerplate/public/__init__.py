from sanic import Blueprint


bp = Blueprint('public')

# load views
from . import views  # noqa

__all__ = ('bp',)
