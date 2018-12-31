from . import bp
from ..template import templated


@bp.route('/')
@bp.route('/chat')
@bp.route('/login')
@templated('index.html')
def page(request):
    return {}
