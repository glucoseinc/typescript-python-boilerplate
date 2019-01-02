import uuidv1 from 'uuid/v1'

import * as chatActions from '@src/actions/chat'
import * as api from '@src/api'
import {InternalInconsistencyError} from '@src/errors'
import store from '@src/store'
import {ChatEventMessage, ClientActionType} from '@src/types'
import websocket from '@src/websocket'
import {ActionDispatcher} from './base'

class ChatActionDispatcher extends ActionDispatcher {
  public async sendMessage(message: string) {
    const {me} = store.getState().user
    if (!me) {
      throw new InternalInconsistencyError('User is not authorized')
    }
    const localId = uuidv1()
    const timestamp = new Date().getTime()

    const chatEvent = ChatEventMessage(localId, null, timestamp, {message, user: me})
    this.dispatch(chatActions.appendChatEvent({chatEvent}))

    websocket.send(ClientActionType.sendChatMessage, chatEvent)
  }
}

export default ChatActionDispatcher
