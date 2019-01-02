import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LockIcon from '@material-ui/icons/LockOutlined'

import {Theme} from '@material-ui/core/styles/createMuiTheme'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles'

import {push} from 'connected-react-router'
import React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {Dispatch} from 'redux'

import UserActionDispatcher from '@src/dispatchers/user'
import {AppState, UserState} from '@src/reducers'

const styles = (theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  })

interface LoginPageProps {
  user: UserState
}

class LoginPage extends React.Component<LoginPageProps & WithStyles<typeof styles> & DispatchProp> {
  // overrides
  public componentDidUpdate(prevProps: LoginPageProps) {
    // login完了したらchatにリダイレクトする
    if (this.props.user.isLoggedIn) {
      const {dispatch} = this.props
      dispatch(push('/chat'))
    }
  }

  public render() {
    const {classes} = this.props

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create user
          </Typography>

          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required={true} fullWidth={true}>
              <InputLabel htmlFor="nickname">Nickname</InputLabel>
              <Input id="nickname" name="nickname" autoComplete="nickname" autoFocus={true} />
            </FormControl>

            <Button type="submit" fullWidth={true} variant="contained" color="primary" className={classes.submit}>
              Log in
            </Button>
          </form>
        </Paper>
      </main>
    )
  }

  // privates
  public onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const {dispatch} = this.props
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await new UserActionDispatcher(dispatch).login(formData.get('nickname') as string)
  }
}

const select = (state: AppState) => {
  return {
    user: state.user,
  }
}

export default connect(select)(withStyles(styles)(LoginPage))
