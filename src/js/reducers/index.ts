import {connectRouter, RouterState} from 'connected-react-router'
import {History} from 'history'
import {combineReducers} from 'redux'

import chatReducer, {ChatState} from './chat'
import userReduicer, {UserState} from './user'

export interface AppState {
  chat: ChatState
  router: RouterState
  user: UserState
}
export {ChatState, RouterState, UserState}

const rootReducer = (history: History) =>
  combineReducers({
    chat: chatReducer,
    router: connectRouter(history),
    user: userReduicer,
  })

export default rootReducer
