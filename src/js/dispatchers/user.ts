import * as userActions from '@src/js/actions/user'
import * as api from '@src/js/api'

import {ActionDispatcher} from './base'

class UserActionDispatcher extends ActionDispatcher {
  public async login(nickname: string) {
    const user = await api.login(nickname)

    this.dispatch(userActions.login({me: user}))
  }
}

export default UserActionDispatcher
