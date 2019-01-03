import {mount} from 'enzyme'
import * as React from 'react'

// https://stackoverflow.com/questions/53184529/typescript-doesnt-recognize-my-jest-mock-module
import * as userdispatcherMock from '@src/dispatchers/__mocks__/user'
import * as userdispatcher from '@src/dispatchers/user'
import FakeProvider from '@src/testing/FakeProvider'
import LoginPage from '../LoginPage'

jest.mock('@src/dispatchers/user')

beforeEach(() => {
  const {default: UserActionDispatcher, loginMock} = userdispatcher as any

  UserActionDispatcher.mockClear()
  loginMock.mockClear()
})

describe('LoginPage', () => {
  test('renders correctly', () => {
    const wrapper = mount(
      <FakeProvider fakeState={{user: {isLoggedIn: false}}}>
        <LoginPage />
      </FakeProvider>
    )
    const page = wrapper.find('LoginPage')
    expect(page).toMatchSnapshot()

    // test submit
    const {default: UserActionDispatcher, loginMock} = userdispatcher as any

    expect(UserActionDispatcher).not.toHaveBeenCalled()
    expect(loginMock).not.toHaveBeenCalled()

    const form = page.find('form').first()
    const nickname = form.find('input#nickname').first()

    nickname.simulate('change', {target: {value: 'nickname'}})

    form.find('input#nickname').forEach((node) => node.simulate('change', {target: {value: 'nickname'}}))

    form.simulate('submit')
    // form.find('[type="submit"]').first().simulate('click')

    expect(UserActionDispatcher).toHaveBeenCalledTimes(1)
    expect(loginMock).toHaveBeenCalledWith('nickname')
  })

  test('redirect when authorized', () => {
    const dispatch = jest.fn()
    const wrapper = mount(
      <FakeProvider fakeState={{user: {isLoggedIn: false}}} dispatch={dispatch}>
        <LoginPage />
      </FakeProvider>
    )
    const page = wrapper.find('LoginPage')

    expect(dispatch).not.toHaveBeenCalled()

    wrapper.setProps({fakeState: {user: {isLoggedIn: true}}})
    expect(dispatch).toHaveBeenCalled()
  })
})
