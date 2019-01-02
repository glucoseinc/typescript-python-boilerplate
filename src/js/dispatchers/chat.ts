import uuidv1 from 'uuid/v1'

import * as chatActions from '@src/js/actions/chat'
import * as api from '@src/js/api'
import store from '@src/js/store'
import {ChatEventMessage} from '@src/js/types'
import {ActionDispatcher} from './base'

class ChatActionDispatcher extends ActionDispatcher {
  public async sendMessage(message: string) {
    const {me} = store.getState().user
    const id = uuidv1()
    const timestamp = new Date().getTime()

    const chatEvent = ChatEventMessage(id, null, timestamp, {message, user: me})
    this.dispatch(chatActions.appendChatEvent({chatEvent}))
  }
}

export default ChatActionDispatcher
