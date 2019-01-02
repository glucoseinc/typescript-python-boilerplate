import {actionCreator} from './base'

import {User} from '@src/types'

export const login = actionCreator<{me: User}>('LOG_IN')
export const logout = actionCreator<{}>('LOG_OUT')
