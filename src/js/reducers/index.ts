import {connectRouter, RouterState} from 'connected-react-router'
import {History} from 'history'
import {combineReducers} from 'redux'

import userReduicer, {UserState} from './user'

export interface AppState {
  router: RouterState
  user: UserState
}
export {UserState}

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReduicer,
  })

export default rootReducer
