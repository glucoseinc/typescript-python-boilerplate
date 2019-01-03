import logging
from unittest.mock import patch

from typescript_python_boilerplate.logging import init_logging


def test_init_logging_should_set_log_level():
    with patch('logging.getLogger') as get_logger_mock:
        logger_mock = get_logger_mock.return_value

        init_logging(False)
        get_logger_mock.assert_called_once()
        logger_mock.setLevel.assert_called_once_with(logging.INFO)

    with patch('logging.getLogger') as get_logger_mock:
        logger_mock = get_logger_mock.return_value

        init_logging(True)
        get_logger_mock.assert_called_once()
        logger_mock.setLevel.assert_called_once_with(logging.DEBUG)
