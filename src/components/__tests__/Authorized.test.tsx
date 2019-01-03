import {LOCATION_CHANGE} from 'connected-react-router'
import {mount} from 'enzyme'
import * as React from 'react'

import {makeFakeProviderWithRouter} from '@src/testing/FakeProvider'
import Authorized from '../Authorized'

describe('Authorized', () => {
  test('render child when authorized', () => {
    const {FakeProvider, dispatchMock, history} = makeFakeProviderWithRouter({user: {isLoggedIn: true}})

    history.push('/')

    const wrapper = mount(
      <FakeProvider>
        <Authorized>
          <div id="child">hello!!</div>
        </Authorized>
      </FakeProvider>
    )
    expect(wrapper.find('#child')).not.toBeNull()

    expect(dispatchMock).toHaveBeenCalled()
    const action = dispatchMock.mock.calls[0][0]
    expect(action.type).toBe(LOCATION_CHANGE)
    expect(action.payload.location.pathname).not.toBe('/login')
  })

  test('redirect when not authorized', () => {
    const {FakeProvider, dispatchMock, history} = makeFakeProviderWithRouter({user: {isLoggedIn: false}})
    history.push('/')
    const wrapper = mount(
      <FakeProvider>
        <Authorized>
          <div id="child">hello!!</div>
        </Authorized>
      </FakeProvider>
    )

    expect(dispatchMock).toHaveBeenCalled()
    const action = dispatchMock.mock.calls[0][0]
    expect(action.type).toBe(LOCATION_CHANGE)
    expect(action.payload.location.pathname).toBe('/login')
  })
})
