import {ConnectedRouter} from 'connected-react-router'
import {History} from 'history'
import React from 'react'
import {Route, Switch} from 'react-router'

import NotFoundPage from './pages/NotFoundPage'
import RootPage from './pages/RootPage'

interface AppProps {
  history: History;
}

const App = ({history}: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={RootPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

export default App
