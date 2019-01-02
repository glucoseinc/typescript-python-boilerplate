import * as infraActions from './actions/infra'
import {InternalInconsistencyError} from './errors'
import store from './store'

const RECONNECT_INTERVAL = 5000

class ChatWebsocket {
  private websocket?: WebSocket
  private lastReconnect: number
  private reconnectTimerId: number

  constructor() {
    this.lastReconnect = 0
  }

  public start() {
    // TODO: API Endpointをサーバから支給する仕組み
    this.websocket = new WebSocket(`ws://${location.host}/api/ws`)
    this.websocket.onclose = this.onClose
    this.websocket.onerror = this.onError
    this.websocket.onmessage = this.onMessage
    this.websocket.onopen = this.onOpen

    store.dispatch(infraActions.websocketConnect.started({}))
  }

  public restart() {
    const now = new Date().getTime()

    if (this.lastReconnect + RECONNECT_INTERVAL > now) {
      // 再接続まで時間をあける
      if (!this.reconnectTimerId) {
        this.reconnectTimerId = setTimeout(this.restart.bind(this), this.lastReconnect + RECONNECT_INTERVAL - now + 1)
      }
      return
    }

    this.lastReconnect = now
    this.reconnectTimerId = 0

    this.start()
  }

  public stop() {
    if (this.websocket) {
      this.websocket.close()
      delete this.websocket
    }
  }

  public send(type: string, payload: any) {
    if (!this.websocket) {
      throw new InternalInconsistencyError('Failed to stringify ws message')
    }
    this.websocket.send(JSON.stringify({type, payload}))
  }

  // privates
  private onClose = (event: CloseEvent) => {
    store.dispatch(infraActions.websocketClosed({}))
  }

  private onError = (event: Event) => {
    store.dispatch(infraActions.websocketConnect.failed({params: {}, error: {}}))
  }

  private onMessage = (event: MessageEvent) => {
    const payload = JSON.parse(event.data)
    store.dispatch(infraActions.websocketMessage(payload))
  }

  private onOpen = (event: Event) => {
    store.dispatch(infraActions.websocketConnect.done({params: {}, result: {}}))
  }
}
const ws = new ChatWebsocket()

export default ws
