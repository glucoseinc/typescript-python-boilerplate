"""
jsのフロントエンドとやり取りするときのためのタイプを定義する
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from cerberus import Validator as BaseValidator, rules_set_registry, schema_registry
from cerberus.errors import BasicErrorHandler

from .exceptions import ValidationError

if TYPE_CHECKING:
    from typing import Optional, TypeVar

    from mypy_extensions import TypedDict

    class JSUser(TypedDict):
        nickname: str
        discriminator: str

    class JSChatEventMessagePayload(TypedDict):
        user: JSUser
        message: str

    ChatEventPayload = TypeVar('Payload')

    class JSChatEvent(TypedDict):
        type: str
        localId: Optional[str]
        serverId: Optional[str]
        timestamp: int
        payload: ChatEventPayload

    SendChatEventActionPayload = JSChatEvent


class ThrowErrorHandle(BasicErrorHandler):
    """エラー時にValidationErrorを投げるErrorHandler"""

    def emit(self, error):
        raise ValidationError(error)


class Validator(BaseValidator):

    def __init__(self, *args, **kwargs):
        kwargs['error_handler'] = ThrowErrorHandle
        super().__init__(*args, **kwargs)


REX_UUID = r'(?i)^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'

rules_set_registry.add('UUIDRequired', {
    'type': 'string',
    'regex': REX_UUID,
})

rules_set_registry.add('UUIDNullable', {
    'type': 'string',
    'regex': REX_UUID,
    'nullable': True,
})

schema_registry.add(
    'JSUser', {
        'nickname': {
            'type': 'string',
        },
        'discriminator': {
            'type': 'string',
            'regex': r'^[0-9a-f]{4}$'
        }
    }
)

schema_registry.add('JSChatEventMessagePayload', {
    'user': {
        'schema': 'JSUser',
    },
    'message': {
        'type': 'string',
    }
})

schema_registry.add(
    'JSWebSocketClientAction', {
        'type': {
            'type': 'string'
        },
        'localId': 'UUIDRequired',
        'serverId': 'UUIDNullable',
        'timestamp': {
            'type': 'integer'
        },
        'payload': {
            'oneof': [{
                'schema': 'JSChatEventMessagePayload',
                'dependencies': {
                    'type': 'message'
                }
            }]
        }
    }
)
