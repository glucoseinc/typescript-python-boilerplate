from __future__ import annotations

import functools
import random
from typing import TYPE_CHECKING

from cerberus import Validator

from sanic.exceptions import ServerError
from sanic.response import json

from . import bp

if TYPE_CHECKING:
    from typing import Dict

LOGIN_SCHEMA = {
    'nickname': {
        'type': 'string',
        'required': True,
        'empty': False,
        'regex': r'^[a-zA-Z0-9_][a-zA-Z0-9_]{2,12}'
    }
}


def api(schema: Dict[str, dict]):

    def wrapper(f):

        @functools.wraps(f)
        def wrapped(request, *args, **kwargs):
            v = Validator()
            ok = v.validate(request.json, LOGIN_SCHEMA)
            if not ok:
                raise ServerError('{}'.format(v.errors), status=400)

            payload = f(request, *args, **kwargs)
            return json({'succeeded': True, 'payload': payload})

        return wrapped

    return wrapper


@bp.route('/login', methods=('POST',))
@api(LOGIN_SCHEMA)
def login(request):
    nickname = request.json['nickname']
    # Discord風のuserの#を決める
    discriminator = '{:04d}'.format(random.randint(0, 9999))

    user = {'nickname': nickname, 'discriminator': discriminator}
    return user
