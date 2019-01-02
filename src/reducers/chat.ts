import {Action} from 'redux'
import {isType} from 'typescript-fsa'

import * as chatActions from '@src/actions/chat'
import {ChatEvent, User} from '@src/types'

export interface ChatState {
  log: ChatEvent[]
}

const initialState: ChatState = {
  log: [],
}

export default function chatReducer(state: ChatState = initialState, action: Action): ChatState {
  if (isType(action, chatActions.appendChatEvent)) {
    return {
      ...state,
      log: state.log.concat(action.payload.chatEvent),
    }
  } else if (isType(action, chatActions.replaceChatLog)) {
    return {
      ...state,
      log: action.payload.log,
    }
  }

  return state
}
