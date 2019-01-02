import {action} from '@storybook/addon-actions'
import * as React from 'react'
import {Provider} from 'react-redux'
import {Dispatch, Store} from 'redux'

export interface FakeProvider {
  fakeState: any
}

const FakeProvider: React.FunctionComponent<FakeProvider> = ({children, fakeState}) => {
  const store: Store = {
    dispatch: action('dispatch') as Dispatch,
    getState: () => fakeState,
    replaceReducer: () => ({}),
    subscribe: () => () => ({}),
  }

  return <Provider store={store}>{children}</Provider>
}

export default FakeProvider
