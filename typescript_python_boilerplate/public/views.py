from . import bp
from ..template import templated


@bp.route('/')
@templated('index.html')
def index(request):
    return {'hello': 'world'}
