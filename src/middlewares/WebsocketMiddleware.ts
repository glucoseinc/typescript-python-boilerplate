import {Action, Dispatch, Middleware, MiddlewareAPI} from 'redux'
import {isType} from 'typescript-fsa'

import * as chatActions from '@src/actions/chat'
import * as infraActions from '@src/actions/infra'
import * as userActions from '@src/actions/user'
import {InternalInconsistencyError} from '@src/errors'
import {ServerActionType} from '@src/types'
import websocket from '@src/websocket'
/**
 * WS(というかゆくゆくはServiceWorker)はloginとともに接続して、logoutとともに切断したいのでMiddelwareで監視する
 */
const websocketMiddleware: Middleware = ({dispatch, getState}: MiddlewareAPI) => (next) => (action: Action) => {
  if (isType(action, userActions.login)) {
    websocket.start()
  } else if (isType(action, userActions.logout)) {
    websocket.stop()
  } else if (isType(action, infraActions.websocketClosed)) {
    // login中だったら再接続
    const {user} = getState()
    if (user.isLoggedIn) {
      websocket.restart()
    }
  } else if (isType(action, infraActions.websocketMessage)) {
    // WSのメッセージを、アプリ内のActionに翻訳して再度Dispatchする
    const wsType = action.payload.type
    const wsPayload = action.payload.payload

    if (wsType === ServerActionType.appendChatEvent) {
      dispatch(chatActions.appendChatEvent({chatEvent: wsPayload}))
    } else if (wsType === ServerActionType.replaceChatLog) {
      dispatch(chatActions.replaceChatLog(wsPayload))
    } else {
      throw new InternalInconsistencyError(`unknown server action '${wsType}'`)
    }
  }

  return next(action)
}

export default websocketMiddleware
