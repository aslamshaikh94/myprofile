import React, { useEffect, useState } from 'react'
import { useStore, setStore } from '@store'
import { callGetUserCout } from '@api/requestType'
import {
  setThemeAction,
  userLoginSuccessAction,
  setUserFullDetailsAction,
} from '@actions'
import history from '@history'
import { HOME_ROUTE, LOGIN_ROUTE } from '@constants/routers'
import './index.scss'

const Header = () => {
  const {
    state: {
      loggedInUserData: { id: userId, username } = {},
      themeMode = 'light',
    } = {},
    dispatch,
  } = useStore()

  const [totalUser, setTotalUser] = useState(0)

  const getUserCount = async () => {
    const { status, data } = await callGetUserCout()
    if (status === 200) setTotalUser(data)
  }

  useEffect(() => {
    getUserCount()
  }, [])

  const handleChange = (e) => {
    const { checked } = e.target
    if (checked) {
      dispatch(setThemeAction('dark'))
      dispatch
    } else {
      dispatch(setThemeAction('light'))
    }
  }
  const userDetails = {
    contactInfo: {},
    educations: [],
    employments: [],
    languages: { languages: [] },
    skills: { skills: [] },
  }

  const handleLogOut = () => {
    dispatch(userLoginSuccessAction({}))
    dispatch(setUserFullDetailsAction(userDetails))
    history.push(HOME_ROUTE)
  }

  const handleLogIn = () => {
    history.push(LOGIN_ROUTE)
  }

  return (
    <div className="Header">
      <div>Total Users: {totalUser}</div>
      <div className="RightGroup">
        {history.location.pathname === '/admin' && (
          <a
            className="AuthIcon"
            target="_blank"
            href={`${window.location.origin}/${username}`}
          >
            <i className="fas fa-eye	"></i>
          </a>
        )}

        {userId ? (
          <span className="AuthIcon" onClick={handleLogOut}>
            <i className="fas fa-sign-out-alt"></i> Sign out
          </span>
        ) : (
          <span className="AuthIcon" onClick={handleLogIn}>
            <i className="fas fa-sign-in-alt"></i> Sign in
          </span>
        )}

        <div className={`lightDarkBtn ${themeMode}`}>
          {themeMode === 'dark' ? (
            <i className="fas fa-sun icon"></i>
          ) : (
            <i className="fas fa-moon icon"></i>
          )}
          <input
            type="checkbox"
            name="theme"
            defaultChecked={themeMode === 'dark'}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
