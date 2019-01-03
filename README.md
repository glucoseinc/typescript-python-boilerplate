フロントエンド(Typescript w/ React + Redux + MaterialUI), サーバ(Python w/ AioHTTP)なプロジェクトのBoilerplate

# Before Use

`typescript-python-boilerplate`と`typescript_python_boilerplate`を自分のプロジェクト名に置換する。

# Policy

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
