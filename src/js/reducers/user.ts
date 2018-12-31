import {Action} from 'redux'
import {isType} from 'typescript-fsa'

import * as userActions from '@src/js/actions/user'
import {User} from '@src/js/types'

export interface UserState {
  isLoggedIn: boolean
  me?: User
}

const initialState: UserState = {
  isLoggedIn: false
}

export default function user(
  state: UserState = initialState,
  action: Action
): UserState {
  console.log('!userReducer', state, action)

  if (isType(action, userActions.login)) {
    return {
      ...state,
      isLoggedIn: true,
      me: action.payload.me
    }
  }

  return state
}
