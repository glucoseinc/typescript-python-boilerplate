[![CircleCI](https://circleci.com/gh/glucoseinc/typescript-python-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/glucoseinc/typescript-python-boilerplate/tree/master)
[![codecov](https://codecov.io/gh/glucoseinc/typescript-python-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/glucoseinc/typescript-python-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/822270b94dba62ecb89e/maintainability)](https://codeclimate.com/github/glucoseinc/typescript-python-boilerplate/maintainability)

フロントエンド(Typescript w/ React + Redux + MaterialUI), サーバ(Python w/ AioHTTP)なプロジェクトのBoilerplate

# Before Use

`typescript-python-boilerplate`と`typescript_python_boilerplate`を自分のプロジェクト名に置換する。

# Policy

以下のポリシーで開発を進める。

* ライブラリは、"License >>> それしかないか/de factoか? > コードがシンプルか? >> 趣味 > 開発の活発さ/枯れ具合"の優先度で検討する。
* フロントエンドの開発は、Hot module reloadingは使わない。できるだけProduction環境と近いもので開発する
* async/await用のmiddleware(=redux-thunk, redux-saga)は使わず、ActionDispatcherで対応する
* コードとテストのファイルは1:1で対応させる

あくまで、原則

# Setup

## dockerを使う場合

おすすめ

```
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

## テスト駆動にすすめる

javascript

```sh
% yarn run test-watch
```

python
```sh
% pipenv shell
% ptw
```

のようにしてWatchモードにしながらコードとテストを書くのが快適だと思う。

## カーボーイにすすめる

```sh
% make run
```

するとWebサーバと、ビルドプロセスが立ち上がるのでローカルのコードを書き換えれば随時Watchされてサーバが再起動 & フロントエンドもリビルドされる。

## Chrome Redux DevTool

あると便利
[Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)からインストールできる

## Pythonのモジュールを追加したら

1. setup.pyの`install_requires`, `extras_require`に追加
2. `pipenv lock && pipenv install --dev`

## JSのモジュールを追加したら

普通に`yarn install [-D]`


# 検討した話とか

[こっち](/ENTRY.md)に書いた。
