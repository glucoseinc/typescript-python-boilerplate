import {actionCreator} from './base'

// websocketに接続しに行く
export const websocketConnect = actionCreator.async<{}, {}, {}>('WEBSOCKET_CONNECT')

// Websocketの接続が閉じられた
export const websocketClosed = actionCreator<{}>('WEBSOCKET_CLOSED')

// Websocketでサーバからメッセージが送られてきた
export const websocketMessage = actionCreator<{
  type: 'REPLACE_CHAT_LOG'
  payload: any
}>('WEBSOCKET_MESSAGE')
