import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router'

import {AppState, UserState} from '../reducers'

interface AuthoizedProps {
  user: UserState
}

class Authoized extends React.Component<AuthoizedProps, {}> {
  // overrides
  public render() {
    const isAuthorized = this.props.user.isLoggedIn

    return isAuthorized ? <Route children={this.props.children} /> : <Redirect to={'/login'} />
  }
}

const select = (state: AppState) => {
  return {
    user: state.user,
  }
}

export default connect(select)(Authoized)
