import {actionCreator} from './base'

import {ChatEvent} from '@src/js/types'

// ChatEventを追加する
export const appendChatEvent = actionCreator<{chatEvent: ChatEvent}>('CHAT_APPEND_EVENT')

// チャットのログを置き換える
export const replaceChatLog = actionCreator<{log: ChatEvent[]}>('CHAT_REPLACE_LOG')
