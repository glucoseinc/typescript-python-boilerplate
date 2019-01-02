import {actionCreator} from './base'

export const websocketConnect = actionCreator.async<{}, {}, {}>('WEBSOCKET_CONNECT')
export const websocketClosed = actionCreator<{}>('WEBSOCKET_CLOSED')
