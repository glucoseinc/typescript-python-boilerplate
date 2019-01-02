import pytest

import typescript_python_boilerplate.interoperability  # noqa
from typescript_python_boilerplate.exceptions import ValidationError
from typescript_python_boilerplate.interoperability import Validator


def test_validate_jschatevent():
    v = Validator()
    assert v.validate(
        {
            'type': 'message',
            'localId': '3d9143c0-0e7a-11e9-9d5b-4364e32ebf0c',
            'serverId': None,
            'timestamp': 1546425379324,
            'payload': {
                'message': 'xxx',
                'user': {
                    'nickname': 'shn',
                    'discriminator': '8591'
                }
            }
        },
        schema='JSWebSocketClientAction'
    ), v.errors

    with pytest.raises(ValidationError):
        assert v.validate(
            {
                'type': 'badtype',
                'localId': '3d9143c0-0e7a-11e9-9d5b-4364e32ebf0c',
                'serverId': None,
                'timestamp': 1546425379324,
                'payload': {
                    'message': 'xxx',
                    'user': {
                        'nickname': 'shn',
                        'discriminator': '8591'
                    }
                }
            },
            schema='JSWebSocketClientAction'
        ), v.errors
