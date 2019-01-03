import {mount} from 'enzyme'
import * as React from 'react'

import NotFoundPage from '../NotFoundPage'

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    const element = mount(<NotFoundPage />)

    expect(element.find('NotFoundPage')).toMatchSnapshot()
  })
})
