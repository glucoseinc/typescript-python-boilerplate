[![CircleCI](https://circleci.com/gh/glucoseinc/typescript-python-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/glucoseinc/typescript-python-boilerplate/tree/master)
[![codecov](https://codecov.io/gh/glucoseinc/typescript-python-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/glucoseinc/typescript-python-boilerplate)
[![Maintainability](https://api.codeclimate.com/v1/badges/822270b94dba62ecb89e/maintainability)](https://codeclimate.com/github/glucoseinc/typescript-python-boilerplate/maintainability)

フロントエンド(Typescript w/ React + Redux + MaterialUI), サーバ(Python w/ AioHTTP)なプロジェクトのBoilerplate

# Before Use

`typescript-python-boilerplate`と`typescript_python_boilerplate`を自分のプロジェクト名に置換する。

# Policy

## ライブラリ選定

* License >>> それしかないか/de factoか? > コードがシンプルか? >> 趣味 > 開発の活発さ/枯れ具合

### License

(弊社業務だと)これをベースに商用利用するものを作ることが多いのでライセンスは定期的に確認する(自動化しろよ)
ライブラリが更新されるとライセンスが変わっていたりする

package.jsonのdependencies, setup.pyのinstall_requiresについてライセンスを確認する。
depDependenciesやextra_requiresは開発中のみ使うものなのであまり気にしない。

使うライブラリの依存関係はどうするか? (効率的な確認方法あるかな)

サーバ側はAGPLでない限り利用可能。
フロントエンド側は(そもそもソースコード配っているようなもんだが...)念の為GPL系は確認する。

注意すべきライセンスは
* GPL系
* BSD-4-Caluse

JSは`yarn licenses ls`、Pyは`pip-licenses`で確認できる。


## 開発スタイル

* Hot module reloadingは使わない

## フロントエンド

* async/await用のmiddleware(=redux-thunk, redux-saga)は使わず、ActionDispatcherで対応する


## サーバ

TODO

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

## Chrome Redux DevTool

あると便利
[Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)からインストールできる

## Pythonのモジュールを追加したら

1. setup.pyの`install_requires`, `extras_require`に追加
2. `pipenv install -e '.[test]'`
3. `pipenv lock`

## JSのモジュールを追加したら

普通に`yarn install [-D]`
