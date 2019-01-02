import {Theme} from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

import classNames from 'classnames'

import React from 'react'

import {ChatEvent, ChatEventMessagePayload} from '@src/types'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'block',
    },
  })

export interface ChatMessageProps {
  chatEvent: ChatEvent<ChatEventMessagePayload>
}

const ChatMessage: React.FunctionComponent<ChatMessageProps & WithStyles<typeof styles>> = (props) => {
  const {
    classes,
    chatEvent: {
      payload: {user, message},
      timestamp,
    },
  } = props
  const date = new Date(timestamp)

  return (
    <div className={classes.root}>
      <div>
        <div>
          {user.nickname}#{user.discriminator}
        </div>
        <div>
          {`${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-` +
            `${(date.getDate() + '').padStart(2, '0')} ` +
            `${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}:` +
            `${(date.getSeconds() + '').padStart(2, '0')}`}
        </div>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default withStyles(styles)(ChatMessage)
