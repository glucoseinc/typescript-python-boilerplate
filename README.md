フロントエンド(Typescript w/ React + Redux + MaterialUI), サーバ(Python w/ AioHTTP)なプロジェクトのBoilerplate

# Before Use

`typescript-python-boilerplate`と`typescript_python_boilerplate`を自分のプロジェクト名に置換する。

# Policy

* Hot module reloadingは使わない


## フロントエンド

* async/await用のmiddleware(=redux-thunk, redux-saga)は使わず、ActionDispatcherで対応する


## サーバ

TODO

## 迷ったところ

* Python 3.7 webframework

async/awaitをnativeにサポートしたらWebFrameworkでaiohttp, sanic, japrontoで迷った。

最初はaiohttpを使おうかな? と思っていたのだけど、以下のベンチマークの結果と(長年使ってきた)flaskに似た構文ということでsanicにした。
japrontoの速さは魅力的だったのだけど、結局アプリケーション側のコードが速度のボトルネックとなるはずでFramework側がカリカリにチューンされている必要はないだろうという判断と、Cで書かれたコードは不具合時の対応が面倒そうだなってのと、なによりSanicの方が開発が活発だったので、Sanicを使ってみることにした。

https://qiita.com/tkngue/items/62101788c0f384a5b12e
https://gist.github.com/samuelcolvin/04f473a0e14c67e46dc743a7613fe300
https://github.com/samuelcolvin/aiohttp-vs-sanic-vs-japronto

* redux middleware

redux自体は純粋関数でstateを管理する、というコンセプトのため例えば直接はasync/awaitなことができない。
よくある解法だとredux-thunk/redux-sagaを使う、ということなのだけど、彼らはけっこう薄いので使わなくてもなんとかなりそうだというのと、[この記事](https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696)に感化されたのもあって、async/awaitはActionDispatcherの仕組みで対応することにしてみた。alminのUseCaseみたいな話で悪くはないと思う。

# Setup

## dockerを使う場合

おすすめ

```
% make build
% make run
```


# dockerを使わない場合

Pythonがなければpyenvで調達

```
$ yarn
$ pipenv --python 3.7
$ pipenv install -e '.[test]'
```

`yarn run watch`をしつつ`typescript-python-boilerplate --debug run`でサーバを実行

# In development

## Chrome Redux DevTool

あると便利
[Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)からインストールできる

便利

## Pythonのモジュールを追加したら

1. setup.pyの`install_requires`, `extras_require`に追加
2. `pipenv install -e '.[test]'`
3. `pipenv lock`

## JSのモジュールを追加したら

普通に`yarn install [-D]`


# Issues

## 開発していると`static/`にカスが溜まる

時々消す? `yarn run watch`の中にclean入れる?

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
* Servieworker
* gRPC
