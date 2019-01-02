// Chat
export enum ChatEventTypes {
  message = 'message',
}

export interface ChatEvent<Payload = any> {
  type: string
  localId: string
  serverId: string | null
  timestamp: number
  payload: Payload
}

function createChatEventFactory<Payload>(
  type: keyof typeof ChatEventTypes
): (localId: string, serverId: string | null, timestamp: number, payload: Payload) => ChatEvent<Payload> {
  function factory(localId: string, serverId: string | null, timestamp: number, payload: Payload): ChatEvent<Payload> {
    return {
      type,
      localId,
      serverId,
      timestamp,
      payload,
    }
  }

  factory.match = (test: ChatEvent): test is ChatEvent<Payload> => {
    return test.type === type
  }

  return factory
}

export interface ChatEventMessagePayload {
  user: User
  message: string
}

export const ChatEventMessage = createChatEventFactory<ChatEventMessagePayload>(ChatEventTypes.message)

// User
export interface User {
  nickname: string
  discriminator: string
}
