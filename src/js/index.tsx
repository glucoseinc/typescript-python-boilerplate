import {createBrowserHistory} from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'

import rootReducer from './reducers'
import App from './App'

const history = createBrowserHistory()
const store = createStore(
  rootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
)


ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('app')
)
