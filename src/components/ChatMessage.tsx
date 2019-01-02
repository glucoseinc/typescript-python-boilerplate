import {Theme} from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

import classNames from 'classnames'

import React from 'react'

import {divider, primaryText, secondaryText} from '@src/palette'
import {ChatEvent, ChatEventMessagePayload} from '@src/types'

const styles = (theme: Theme) =>
  createStyles({
    date: {
      color: secondaryText,
      fontSize: '0.6rem',
    },
    discriminator: {
      color: secondaryText,
      fontSize: '0.6rem',
    },
    meta: {},
    nickname: {
      color: primaryText,
      fontSize: '0.8rem',
    },
    root: {
      display: 'block',
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: divider,
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
      <div className={classes.meta}>
        <span>
          <span className={classes.nickname}>{user.nickname}</span>
          <span className={classes.discriminator}>#{user.discriminator}</span>
        </span>
        <span className={classes.date}>
          {`${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}-` +
            `${(date.getDate() + '').padStart(2, '0')} ` +
            `${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}:` +
            `${(date.getSeconds() + '').padStart(2, '0')}`}
        </span>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default withStyles(styles)(ChatMessage)
