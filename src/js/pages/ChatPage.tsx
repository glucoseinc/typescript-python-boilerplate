import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import React from 'react'
import {connect, DispatchProp} from 'react-redux'

import ChatActionDispatcher from '@src/js/dispatchers/chat'
import {AppState, UserState} from '@src/js/reducers'
import {ChatEvent, User} from '@src/js/types'

interface ChatPageProps {
  log: ChatEvent[]
  me: User
}

interface ChatPageState {
  // message送信中はtrue
  isMessageSending: boolean
  message: string
}

class ChatPage extends React.Component<ChatPageProps & DispatchProp, ChatPageState> {
  constructor(props: ChatPageProps & DispatchProp) {
    super(props)

    this.state = {
      isMessageSending: false,
      message: '',
    }
  }

  public render() {
    const {me} = this.props
    const {isMessageSending, message} = this.state

    const disableSendButton = isMessageSending ? true : false

    return (
      <div>
        {this.renderChatLog()}
        <div>
          <TextField autoFocus={true} multiline={true} value={message} onChange={this.onMessageChanged} />
          <Button disabled={disableSendButton} onClick={this.onMessageSendClicked}>
            SEND
          </Button>
        </div>
      </div>
    )
  }

  // private
  private renderChatLog() {
    const {log} = this.props

    if (!log.length) {
      return <div>チャットがありません</div>
    }

    return (
      <div>
        {log.map((chatEvent: ChatEvent) => {
          return (
            <div>
              {chatEvent.localId}: {chatEvent.serverId}
            </div>
          )
        })}
      </div>
    )
  }

  private setStateAsync<K extends keyof ChatPageState>(newState: Pick<ChatPageState, K>): Promise<void> {
    return new Promise<void>((resolve) => {
      this.setState(newState, resolve)
    })
  }

  private onMessageChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({message: event.target.value})
  }

  private onMessageSendClicked = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const {dispatch} = this.props
    const {message} = this.state
    if (!message.length) {
      return
    }

    await this.setStateAsync({message: '', isMessageSending: true})

    try {
      await new ChatActionDispatcher(dispatch).sendMessage(message)
    } catch (e) {
      throw e
    } finally {
      await this.setStateAsync({isMessageSending: false})
    }
  }
}

const select = (state: AppState) => {
  const {me} = state.user
  const {log} = state.chat
  return {me, log}
}

export default connect(select)(ChatPage)
