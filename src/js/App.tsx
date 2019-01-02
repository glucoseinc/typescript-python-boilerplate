import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

import {ConnectedRouter} from 'connected-react-router'
import {History} from 'history'
import React from 'react'
import {Route, Switch} from 'react-router'

import AppContainer from './components/AppContainer'
import Authorized from './components/Authorized'

import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import RootPage from './pages/RootPage'

// material-ui theme
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  typography: {
    useNextVariants: true,
  },
})

interface AppProps {
  history: History
}

const App = ({history}: AppProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact={true} path="/" component={RootPage} />
              <Route path="/login" component={LoginPage} />

              <Authorized>
                <Route path="/chat" component={ChatPage} />
              </Authorized>

              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </ConnectedRouter>
      </AppContainer>
    </MuiThemeProvider>
  )
}

export default App
