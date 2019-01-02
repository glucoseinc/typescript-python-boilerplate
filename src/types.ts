// Chat
export enum ChatEventTypes {
  message = 'message',
}

export interface ChatEvent<Payload = any> {
  type: string
  localId: string | null
  serverId: string | null
  timestamp: number
  payload: Payload
}

interface ChatEventCreator<Payload> {
  match: (chatEvent: ChatEvent) => chatEvent is ChatEvent<Payload>
  (localId: string, serverId: string | null, timestamp: number, payload: Payload): ChatEvent<Payload>
}

function createChatEventFactory<Payload>(type: keyof typeof ChatEventTypes): ChatEventCreator<Payload> {
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

// WS
export enum ClientActionType {
  sendChatMessage = 'SEND_CHAT_MESSAGE',
}

export enum ServerActionType {
  appendChatEvent = 'APPEND_CHAT_EVENT',
  replaceChatLog = 'REPLACE_CHAT_LOG',
}
