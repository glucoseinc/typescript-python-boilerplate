import {mount} from 'enzyme'
import * as React from 'react'

import {makeFakeProviderWithRouter} from '@src/testing/FakeProvider'
import RootPage from '../RootPage'

describe('RootPage', () => {
  test('renders correctly', () => {
    const {FakeProvider} = makeFakeProviderWithRouter({})
    const element = mount(
      <FakeProvider>
        <RootPage />
      </FakeProvider>
    )

    expect(element.find('RootPage')).toMatchSnapshot()
  })
})
