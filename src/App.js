import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Home from '@views/Home'
import Dashboard from '@views/Dashboard'
import Admin from '@views/Admin'
import Auth from '@views/Auth'
import { LOGIN_ROUTE, HOME_ROUTE, ADMIN_ROUTE } from '@constants/routers'
import history from '@history/'
import { useStore } from '@store'
import { setThemeMode } from '@utils'
import PrivateRoute from '@shared/PrivateRoute'
import './style.scss'

const App = () => {
  const { state: { themeMode } = {} } = useStore()
  setThemeMode(themeMode)

  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute path={ADMIN_ROUTE} component={Admin} />
          <Route path={LOGIN_ROUTE} component={Auth} />
          <Route exact path={HOME_ROUTE} component={Dashboard} />
          <Route path={HOME_ROUTE} component={Home}>
            <Route path={'/:id'} component={Home}></Route>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
