import {mount} from 'enzyme'
import * as React from 'react'

import FakeProvider from '@src/testing/FakeProvider'
import {TEST_DATA} from '../__stories__/ChatPage.stories'
import ChatPage from '../ChatPage'

describe('ChatPage', () => {
  test('renders correctly', () => {
    const element = mount(
      <FakeProvider fakeState={TEST_DATA.simple}>
        <ChatPage />
      </FakeProvider>
    )

    expect(element.find('ChatPage')).toMatchSnapshot()
  })
})
