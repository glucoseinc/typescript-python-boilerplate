#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import find_packages, setup

setup(
    name='typescript-python-boilerplate',
    version='0.0.1',
    packages=find_packages(exclude=['tests']),
    install_requires=[
        'aioredis',
        'cerberus',
        'click',
        'colorama',
        'jinja2',
        'sanic',
    ],
    dependency_links=[],
    entry_points={
        'console_scripts': [
            'typescript-python-boilerplate=typescript_python_boilerplate.__main__:cli',
        ],
    },
    extras_require={
        'test': [
            'autopep8',
            'coverage',
            'flake8',
            'flake8-import-order',
            'mypy',
            'pytest',
            'pytest-asyncio',
            'pytest-cov',
            'pytest-timeout',
            'tcptest',
            'yapf',
        ],
    }
)
