"""
jsのフロントエンドとやり取りするときのためのタイプを定義する
"""

from __future__ import annotations

from typing import TYPE_CHECKING

from cerberus import Validator, rules_set_registry, schema_registry
from cerberus.errors import BasicErrorHandler

from .constants import ChatEventType, WSClientActionType
from .exceptions import ValidationError

if TYPE_CHECKING:
    from typing import Any, Optional

    from mypy_extensions import TypedDict

    class JSUser(TypedDict):
        nickname: str
        discriminator: str

    class JSChatEventMessagePayload(TypedDict):
        user: JSUser
        message: str

    class JSChatEvent(TypedDict):
        type: str
        localId: Optional[str]
        serverId: Optional[str]
        timestamp: int
        payload: Any

    JSSendChatEventActionPayload = JSChatEvent


class ThrowErrorHandle(BasicErrorHandler):
    """エラー時にValidationErrorを投げるErrorHandler"""

    def end(self, validator):
        if validator.errors:
            raise ValidationError(validator.errors)


validator = Validator(error_handler=ThrowErrorHandle)

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
    'JSChatEvent', {
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
                    'type': ChatEventType.message.value
                }
            }]
        }
    }
)

schema_registry.add(
    'JSWebSocketClientMessage', {
        'type': {
            'type': 'string',
        },
        'payload': {
            'oneof': [{
                'schema': 'JSChatEvent',
                'dependencies': {
                    'type': WSClientActionType.SEND_CHAT_MESSAGE.value
                }
            }]
        }
    }
)
