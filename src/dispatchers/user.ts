import * as userActions from '@src/actions/user'
import * as api from '@src/api'

import {ActionDispatcher} from './base'

class UserActionDispatcher extends ActionDispatcher {
  public async login(nickname: string) {
    const user = await api.login(nickname)

    this.dispatch(userActions.login({me: user}))
  }
}

export default UserActionDispatcher
