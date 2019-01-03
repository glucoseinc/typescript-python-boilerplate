# -*- coding: utf-8 -*-
import pytest

from typescript_python_boilerplate.webapp import create_webapp


@pytest.fixture()
def webapp():
    webapp = create_webapp(
        dummy_manifest={
            'index.js': "/static/index.00000000000000000000.js",
            'vendor.js': "/static/vendor.00000000000000000000.js"
        }
    )

    return webapp
