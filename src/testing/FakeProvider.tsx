import {ConnectedRouter, connectRouter, routerMiddleware, RouterState} from 'connected-react-router'
import {createMemoryHistory} from 'history'
import * as React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, compose, createStore, Dispatch, Store} from 'redux'

export interface FakeProvider {
  fakeState: any
  dispatch?: Dispatch
}

const FakeProvider: React.FunctionComponent<FakeProvider> = ({children, dispatch, fakeState}) => {
  if (!dispatch) {
    dispatch = jest.fn()
  }

  const store: Store = {
    // dispatch: action('dispatch') as Dispatch,
    dispatch,
    getState: () => fakeState,
    replaceReducer: () => ({}),
    subscribe: () => () => ({}),
  }

  return <Provider store={store}>{children}</Provider>
}

export function makeFakeProviderWithRouter(fakeState: any) {
  const dispatch = jest.fn()
  const history = createMemoryHistory()
  const store = createStore(
    combineReducers(
      Object.keys(fakeState).reduce(
        (reducers, key) => {
          return {
            ...reducers,
            [key]: (state: any) => fakeState[key],
          }
        },
        {
          router: connectRouter(history),
        }
      )
    )
  )
  store.dispatch = dispatch

  const FakeProviderWithRouter: React.FunctionComponent<{}> = ({children}) => {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    )
  }

  return {
    FakeProvider: FakeProviderWithRouter,
    history,
    dispatchMock: dispatch,
  }
}

export default FakeProvider
