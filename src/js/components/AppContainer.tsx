import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import {Theme} from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

import classNames from 'classnames'

import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    appBarSpacer: theme.mixins.toolbar, /// < ださいけど、MateiralUIのsampleの通り...
    mainContent: {
      flexGrow: 1,
      padding: theme.spacing.unit
    },
    root: {
      display: 'flex'
    },
    title: {},
    toolbar: {}
  })

const AppContainer: React.FunctionComponent<
  WithStyles<typeof styles>
> = props => {
  const {children, classes} = props

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap={true}
            className={classes.title}
          >
            typescript-python-boilerplate
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.mainContent}>
        <div className={classes.appBarSpacer} />
        {children}
      </div>
    </div>
  )
}

export default withStyles(styles)(AppContainer)
