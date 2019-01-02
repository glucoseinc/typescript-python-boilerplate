class ApplicationError(RuntimeError):
    """Applicationレベルのエラー"""


class ValidationError(RuntimeError):
    """リクエストなどのValidation失敗時のエラー"""


class BadActionError(ApplicationError):
    """
    サポートしない|間違っている、API|WebSocket Action
    """
