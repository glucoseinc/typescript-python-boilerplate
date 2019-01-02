import Typography from '@material-ui/core/Typography'

import React from 'react'
import {Link} from 'react-router-dom'

const RootPage: React.FunctionComponent<{}> = () => {
  return (
    <main>
      <Typography variant="h4" gutterBottom={true} component="h2">
        Root
      </Typography>

      <p>
        <Link to="/chat">Start chat</Link>
      </p>
    </main>
  )
}

export default RootPage
