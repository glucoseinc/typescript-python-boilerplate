import enum


class ChatEventType(enum.Enum):
    message = 'message'


class WSClientActionType(enum.Enum):
    SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE'


class WSServerActionType(enum.Enum):
    REPLACE_CHAT_LOG = 'REPLACE_CHAT_LOG'
