import click

from .template import templated
from .logging import init_logging


@click.group()
@click.option('--debug/--no-debug', default=False)
@click.pass_context
def cli(ctx: click.Context, debug: bool):
    ctx.ensure_object(dict)
    ctx.obj['DEBUG'] = debug


@cli.command()  # @cli, not @click!
@click.pass_context
def run(ctx: click.Context):
    webapp = create_webapp()

    @webapp.route('/')
    @templated('index.html')
    def index(request):
        return {'hello': 'world'}

    webapp.run(host='0.0.0.0', port=8000)
