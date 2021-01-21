import React, { useEffect } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Loader from '@shared/Loader'
import Home from '@views/Home'
import Dashboard from '@views/Dashboard'
import Admin from '@views/Admin'
import Auth from '@views/Auth'
import ResetPassword from '@views/Auth/ResetPassword'
import ForgotPassword from '@views/Auth/ForgotPassword'
import NotFound from '@views/NotFound'
import {
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  HOME_ROUTE,
  ADMIN_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  FORGOT_PASSWORD_ROUTE,
} from '@constants/routers'
import history from '@history/'
import { useStore } from '@store'
import { setThemeMode } from '@utils'
import PrivateRoute from '@shared/PrivateRoute'
import './style.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { state: { themeMode, userDetails = {} } = {} } = useStore()

  setThemeMode(themeMode)

  const { contactInfo: { name = 'StackOverPro' } = {} } = userDetails

  useEffect(() => {
    document.title = name
  }, [name])

  return (
    <div>
      <Loader />
      <Router history={history}>
        <Switch>
          <PrivateRoute path={ADMIN_ROUTE} component={Admin} />
          <Route path={LOGIN_ROUTE} component={Auth} />
          <Route exact path={HOME_ROUTE} component={Dashboard} />
          <Route path={PAGE_NOT_FOUND_ROUTE} component={NotFound} />
          <Route path={FORGOT_PASSWORD_ROUTE} component={ForgotPassword} />
          <Route path={RESET_PASSWORD_ROUTE} component={ResetPassword}>
            <Route path={'/:id'} component={ResetPassword}></Route>
          </Route>
          <Route path={HOME_ROUTE} component={Home}>
            <Route exact path={'/:id'} component={Home}></Route>
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
