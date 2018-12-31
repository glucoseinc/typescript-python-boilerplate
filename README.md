クライアント: Typescript w/ React + Redux + MaterialUI, サーバ: Python w/ AioHTTP なプロジェクトのBoilerplate

# Policy

* Hot module reloadingは使わない


## フロントエンド

* async/await用のmiddlewareは用意しない

https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696#actiondispacherの書き方


## サーバ


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


## MaterialUI 3.8.1 で JSSのTypeエラー

https://github.com/mui-org/material-ui/issues/14040


# TODO

* URL Builder
* API
* Websocket
* Servieworker
* gRPC
