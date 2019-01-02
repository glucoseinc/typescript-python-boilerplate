import {ChatEventMessage} from '../types'

describe('createChatEventFactory', () => {
  test('can make customized ChatEvent', () => {
    const event = ChatEventMessage('localId', 'serverId', 123, {
      user: {nickname: 'test', discriminator: '1234'},
      message: 'hello',
    })

    expect(ChatEventMessage.match(event)).toBeTruthy()
  })
})
