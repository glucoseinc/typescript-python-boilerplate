クライアント: Typescript w/ React + Redux + MaterialUI, サーバ: Python w/ AioHTTP なプロジェクトのBoilerplate


# Setup

Pythonがなければpyenvで調達

```
$ yarn
$ pipenv --python 3.7
$ pipenv install -e '.[test]'
```

# In development
## Pythonのモジュールを追加したら

1. setup.pyの`install_requires`, `extras_require`に追加
2. `pipenv install -e '.[test]'`


# Issues

## typescript 3.2.2 + history でコンパイルエラー

https://github.com/Microsoft/TypeScript/issues/28810
