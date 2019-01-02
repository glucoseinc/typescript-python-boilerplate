import * as infraActions from './actions/infra'
import store from './store'

class ChatWebsocket {
  private websocket?: WebSocket

  constructor() {}

  public start() {
    console.log(location)
    // TODO: host名をとってくる
    this.websocket = new WebSocket(`ws://${location.hostname}/api/ws`)
    this.websocket.onclose = this.onClose
    this.websocket.onerror = this.onError
    this.websocket.onmessage = this.onMessage
    this.websocket.onopen = this.onOpen

    store.dispatch(infraActions.websocketConnect.started({}))
  }

  public stop() {
    if (this.websocket) {
      this.websocket.close()
      delete this.websocket
    }
  }

  private onClose(event: Event) {
    store.dispatch(infraActions.websocketClosed({}))
  }

  private onError(event: Event) {
    console.log(event)
    store.dispatch(infraActions.websocketConnect.failed({params: {}, error: {}}))
  }

  private onMessage(event: Event) {
    debugger
  }

  private onOpen(event: Event) {
    store.dispatch(infraActions.websocketConnect.done({params: {}, result: {}}))
  }
}
const ws = new ChatWebsocket()

export default ws
