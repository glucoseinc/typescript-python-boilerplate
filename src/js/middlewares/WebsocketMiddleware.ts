import {Action, Dispatch, Middleware, MiddlewareAPI} from 'redux'
import {isType} from 'typescript-fsa'

import * as infraActions from '@src/js/actions/infra'
import * as userActions from '@src/js/actions/user'
import websocket from '@src/js/websocket'
/**
 * WS(というかゆくゆくはServiceWorker)はloginとともに接続して、logoutとともに切断したいのでMiddelwareで監視する
 */
const websocketMiddleware: Middleware = ({getState}: MiddlewareAPI) => (next) => (action: Action) => {
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
  }

  return next(action)
}

export default websocketMiddleware
