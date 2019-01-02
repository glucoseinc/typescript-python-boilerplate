# -*- coding:utf-8 -*-
import logging
import sys

try:
    import colorama
    has_colorama = True
except ImportError:
    has_colorama = False

__all__ = ('NiceColoredFormatter', 'init_logging', 'logger')

if has_colorama:

    class NiceColoredFormatter(logging.Formatter):
        short_levelname_map = {'DEBUG': 'DBUG', 'INFO': 'INFO', 'WARNING': 'WARN', 'ERROR': 'ERRO', 'CRITICAL': 'CRIT'}
        level_color_map = {
            'DEBUG': colorama.Style.DIM + colorama.Fore.WHITE,
            'INFO': colorama.Fore.WHITE,
            'WARNING': colorama.Fore.YELLOW,
            'ERROR': colorama.Fore.RED,
            'CRITICAL': colorama.Style.BRIGHT + colorama.Fore.RED + colorama.Back.WHITE,
        }
        name_color = colorama.Fore.MAGENTA
        asctime_color = colorama.Style.DIM + colorama.Fore.WHITE

        def _colored(self, color, text):
            return '{}{}{}'.format(color, text, colorama.Style.RESET_ALL)

        def formatMessage(self, record):  # noqa
            assert isinstance(record, logging.LogRecord)

            record.nice_levelname = self._colored(
                self.level_color_map[record.levelname], '[{}]'.format(self.short_levelname_map[record.levelname])
            )
            record.nice_name = self._colored(self.name_color, record.name)
            if hasattr(record, 'asctime'):
                record.asctime = self._colored(self.asctime_color, record.asctime)

            # py3k
            return self._style.format(record) + colorama.Style.RESET_ALL


def init_logging(debug, force_tty=False):
    fh = logging.StreamHandler(sys.stderr)
    if force_tty or sys.stderr.isatty():
        # if we are attached to tty, use colorful.

        if has_colorama:
            fh.setFormatter(NiceColoredFormatter('%(nice_levelname)s %(asctime)s %(nice_name)s : %(message)s',))
        else:
            fh.setFormatter(logging.Formatter('%(levelname)s %(asctime)s %(name)s : %(message)s',))
    else:
        # init logging
        # TODO: LTSVにする
        fh.setFormatter(logging.Formatter('%(levelname)s %(asctime)s %(name)s : %(message)s',))

    root_logger = logging.getLogger()
    root_logger.addHandler(fh)
    root_logger.setLevel(logging.DEBUG if debug else logging.INFO)


logger = logging.getLogger('typescript-python-boilerplate')
