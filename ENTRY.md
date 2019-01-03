READMEに書いていない話をこっちで

## 迷ったところ

### Python 3.7 webframework

async/awaitをnativeにサポートしたらWebFrameworkでaiohttp, sanic, japrontoで迷った。

最初はaiohttpを使おうかな? と思っていたのだけど、以下のベンチマークの結果と(長年使ってきた)flaskに似た構文ということでsanicにした。
japrontoの速さは魅力的だったのだけど、結局アプリケーション側のコードが速度のボトルネックとなるはずでFramework側がカリカリにチューンされている必要はないだろうという判断と、Cで書かれたコードは不具合時の対応が面倒そうだなってのと、なによりSanicの方が開発が活発だったので、Sanicを使ってみることにした。

https://qiita.com/tkngue/items/62101788c0f384a5b12e
https://gist.github.com/samuelcolvin/04f473a0e14c67e46dc743a7613fe300
https://github.com/samuelcolvin/aiohttp-vs-sanic-vs-japronto

### redux middleware

redux自体は純粋関数でstateを管理する、というコンセプトのため例えば直接はasync/awaitなことができない。
よくある解法だとredux-thunk/redux-sagaを使う、ということなのだけど、彼らはけっこう薄いので使わなくてもなんとかなりそうだというのと、[この記事](https://qiita.com/uryyyyyyy/items/d8bae6a7fca1c4732696)に感化されたのもあって、async/awaitはActionDispatcherの仕組みで対応することにしてみた。alminのUseCaseみたいな話で悪くはないと思う。
