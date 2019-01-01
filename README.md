クライアント: Typescript w/ React + Redux + MaterialUI, サーバ: Python w/ AioHTTP なプロジェクトのBoilerplate

# Policy

* Hot module reloadingは使わない


## フロントエンド

* async/await用のmiddlewareは用意しない

https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696#actiondispacherの書き方


## サーバ


# Setup(use docker)

```
% make build
```


# Setup(no using docker)

Pythonがなければpyenvで調達

```
$ yarn
$ pipenv --python 3.7
$ pipenv install -e '.[test]'
```

# In development

## Chrome Redux DevTool

あると便利
[Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)からインストールできる

便利

## Pythonのモジュールを追加したら

1. setup.pyの`install_requires`, `extras_require`に追加
2. `pipenv install -e '.[test]'`


# Issues

## typescript 3.2.2 + history でコンパイルエラー

https://github.com/Microsoft/TypeScript/issues/28810


## MaterialUI 3.8.1 で JSSのTypeエラー

https://github.com/mui-org/material-ui/issues/14040

[このworkaround](https://github.com/mui-org/material-ui/issues/14040#issuecomment-450690273)で以下を設定している。治ったら消すこと
```package.json
    "jss": "~10.0.0-alpha.5",
```


# TODO

* URL Builder
* API
* Websocket
* Servieworker
* gRPC
