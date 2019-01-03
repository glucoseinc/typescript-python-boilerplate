import {isType} from 'typescript-fsa'

import * as chatActions from '@src/actions/chat'
import * as infraActions from '@src/actions/infra'
import * as userActions from '@src/actions/user'
import {ServerActionType} from '@src/types'
import * as websocketModule from '@src/websocket'

import websocketMiddleware from '../WebsocketMiddleware'

jest.mock('@src/websocket')

beforeEach(() => {
  const {startMock} = websocketModule as any

  startMock.mockClear()
})

describe('WebsocketMiddleware', () => {
  test('starts websocket at login', () => {
    const {startMock} = websocketModule as any
    const dispatch = jest.fn()
    const getState = jest.fn()
    const next = jest.fn()

    const middleware = websocketMiddleware({dispatch, getState})(next)

    expect(startMock).not.toHaveBeenCalled()
    middleware(userActions.login({me: {nickname: 'nickname', discriminator: '1234'}}))
    expect(startMock).toHaveBeenCalled()
  })

  test('stops websocket at logout', () => {
    const {stopMock} = websocketModule as any
    const dispatch = jest.fn()
    const getState = jest.fn()
    const next = jest.fn()

    const middleware = websocketMiddleware({dispatch, getState})(next)

    expect(stopMock).not.toHaveBeenCalled()
    middleware(userActions.logout({}))
    expect(stopMock).toHaveBeenCalled()
  })

  test('interprets appendChatEvent message', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const next = jest.fn()

    const middleware = websocketMiddleware({dispatch, getState})(next)

    expect(dispatch).not.toHaveBeenCalled()
    middleware(
      infraActions.websocketMessage({
        type: ServerActionType.appendChatEvent,
        payload: {},
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const action = dispatch.mock.calls[0][0]
    expect(isType(action, chatActions.appendChatEvent)).toBeTruthy()
  })

  test('interprets replaceChatLog message', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const next = jest.fn()

    const middleware = websocketMiddleware({dispatch, getState})(next)

    expect(dispatch).not.toHaveBeenCalled()
    middleware(
      infraActions.websocketMessage({
        type: ServerActionType.replaceChatLog,
        payload: {},
      })
    )
    expect(dispatch).toHaveBeenCalled()
    const action = dispatch.mock.calls[0][0]
    expect(isType(action, chatActions.replaceChatLog)).toBeTruthy()
  })
})
