import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import {Theme} from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

import classNames from 'classnames'

import * as React from 'react'

const styles = (theme: Theme) => {
  // theme.mixins.toolbarは@mediaクエリがあるけど面倒なので無視している...
  const toolbarHeight: number = +(theme.mixins.toolbar.minHeight || 64)
  const padding: number = theme.spacing.unit

  return createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: `${theme.spacing.unit + toolbarHeight}px ${theme.spacing.unit * 3}px ${theme.spacing.unit}px`,
    },
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    title: {},
    toolbar: {},
  })
}

const AppContainer: React.FunctionComponent<WithStyles<typeof styles>> = (props) => {
  const {children, classes} = props

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap={true} className={classes.title}>
            typescript-python-boilerplate
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>{children}</div>
    </div>
  )
}

export default withStyles(styles)(AppContainer)
