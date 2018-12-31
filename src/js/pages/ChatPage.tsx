import React from 'react'
import {connect, DispatchProp} from 'react-redux'

import {AppState, UserState} from '@src/js/reducers'

interface ChatPageProps {
  user: UserState
}

const ChatPage: React.FunctionComponent<
  ChatPageProps & DispatchProp
> = props => {
  const {me} = props.user

  return (
    <div>
      Chat
      <p>
        Hello {me.nickname}#{me.discriminator}
      </p>
    </div>
  )
}

const select = (state: AppState) => {
  return {
    user: state.user
  }
}

export default connect(select)(ChatPage)
