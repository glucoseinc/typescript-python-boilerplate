import {action} from '@storybook/addon-actions'
import {storiesOf} from '@storybook/react'
import * as React from 'react'

import ChatMessage from '../ChatMessage'

export const TEST_DATA = {
  simple: {
    chatEvent: {
      type: 'message',
      payload: {
        user: {
          nickname: 'test',
          discriminator: '1234',
        },
        message: 'hogehgoehogehoge',
      },
      localId: '69A6FEA4-84E4-473E-9689-7DC2E6F5F82C',
      serverId: '69A6FEA4-84E4-473E-9689-7DC2E6F5F82C',
      timestamp: 1546442227650,
    },
  },
}

storiesOf('ChatMessage', module).add('simple', () => <ChatMessage {...TEST_DATA.simple} />)
