import {actionCreator} from './base'

import {ChatEvent} from '@src/js/types'

export const appendChatEvent = actionCreator<{chatEvent: ChatEvent}>('CHAT_APPEND')
