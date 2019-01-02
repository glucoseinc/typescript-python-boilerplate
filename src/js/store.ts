import {routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'

import websocketMiddleware from './middlewares/WebsocketMiddleware'
import rootReducer from './reducers'

export const history = createBrowserHistory()

// ReduxDevToolsを絡められるように
const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(routerMiddleware(history), websocketMiddleware))
)

export default store
