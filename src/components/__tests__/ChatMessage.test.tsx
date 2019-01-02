import {shallow} from 'enzyme'
import * as React from 'react'

import {TEST_DATA} from '../__stories__/ChatMessage.stories'
import ChatMessage from '../ChatMessage'

describe('ChatMessage', () => {
  test('renders correctly', () => {
    const element = shallow(<ChatMessage {...TEST_DATA.simple} />)

    expect(element).toMatchSnapshot()
  })
})
