from .template import templated
from .webapp import create_webapp


def main() -> None:
    webapp = create_webapp()

    @webapp.route('/')
    @templated('index.html')
    def index(request):
        return {'hello': 'world'}

    webapp.run(host='0.0.0.0', port=8000)
