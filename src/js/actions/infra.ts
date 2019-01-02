import {actionCreator} from './base'

// websocketに接続しに行く
export const websocketConnect = actionCreator.async<{}, {}, {}>('WEBSOCKET_CONNECT')

// Websocketの接続が閉じられた
export const websocketClosed = actionCreator<{}>('WEBSOCKET_CLOSED')

// Websocketでサーバからメッセージが送られてきた
// TODO: 手抜き
export const websocketMessage = actionCreator<{
  type: 'APPEND_CHAT_EVENT' | 'REPLACE_CHAT_LOG'
  payload: any
}>('WEBSOCKET_MESSAGE')
