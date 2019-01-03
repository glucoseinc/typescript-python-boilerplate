import {storiesOf} from '@storybook/react'
import * as React from 'react'

import FakeProvider from '@src/testing/FakeProvider'
import ChatPage from '../ChatPage'

export const TEST_DATA = {
  simple: {
    user: {
      me: {
        nickname: 'test',
        discriminator: '1234',
      },
    },
    chat: {
      log: [
        {
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
      ],
    },
  },
}

storiesOf('ChatPage', module)
  .addDecorator((story) => (
    <div className="StorybookFakePage" style={{height: '400px', position: 'relative', border: '1px solid red'}}>
      {story()}
    </div>
  ))
  .add('simple', () => (
    <FakeProvider fakeState={TEST_DATA.simple}>
      <ChatPage />
    </FakeProvider>
  ))
