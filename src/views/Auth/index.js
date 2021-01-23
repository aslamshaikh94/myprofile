import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InputField, SwitchButton } from '@shared/FormField'
import {
  callUserSignup,
  callUserSignin,
  callIsUsername,
  callGetLoginUserFullGetails,
} from '@api/requestType'
import { useStore } from '@store/'
import { FORGOT_PASSWORD_ROUTE } from '@constants/routers'
import { userLoginSuccessAction, setUserFullDetailsAction } from '@actions'
import { ADMIN_ROUTE } from '@constants/routers'
import { formSwitch } from '@constants'
import history from '@history'
import { removeSpacesLowerCase } from '@utils'
import './index.scss'

const Auth = () => {
  const {
    state: { loggedInUserData: { id: userId } = {} },
    dispatch,
  } = useStore()

  useEffect(() => {
    if (userId) history.push(ADMIN_ROUTE)
  }, [])

  const [userDetails, setuserDetails] = useState({ authform: 'signin' })
  const [isUsername, setIsUsername] = useState(true)

  const { authform, username, email, password } = userDetails

  const handleChange = (e) => {
    const { name, value } = e.target
    setuserDetails({ ...userDetails, [name]: removeSpacesLowerCase(value) })
  }

  const checkIsUsername = async () => {
    if (username) {
      const { status, data } = await callIsUsername({ username })
      if (status === 200) {
        setIsUsername(data.isUsername)
      }
    }
  }

  let typingTimeout

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    typingTimeout = setTimeout(() => {
      checkIsUsername()
    }, 1000)

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [username])

  const getUserFullDetails = async (username) => {
    if (username) {
      const { status, data } = await callGetLoginUserFullGetails({
        username: `/${username}`,
      })
      if (status === 200) {
        dispatch(setUserFullDetailsAction(data))
      }
      history.push(ADMIN_ROUTE)
    }
  }

  const handleSubmit = async () => {
    let resData = {}

    if (authform === 'signup') {
      resData = await callUserSignup({
        username,
        email,
        password,
      })
    } else {
      resData = await callUserSignin({ email, password })
    }

    const { status, data } = resData

    if (status === 200) {
      dispatch(userLoginSuccessAction(data))
      getUserFullDetails(data.username)
    }
  }

  const ProfileLink = () => {
    if (username && isUsername) {
      return 'This username is not available'
    } else if (username && !isUsername) {
      return (
        <>
          This username is available
          <a target="_blank" href={`${window.location.origin}/${username}`}>
            {username && ` ${window.location.origin}/${username}`}
          </a>
        </>
      )
    } else return false
  }

  return (
    <div className="Auth">
      <div className="Box">
        <SwitchButton
          name="authform"
          optionsName={Object.keys(formSwitch)}
          optionsValue={Object.values(formSwitch)}
          checked={authform}
          onChange={handleChange}
        />
        <p className="ProfileName">{<ProfileLink />}</p>
        {authform !== 'signin' && (
          <InputField
            type="text"
            lable="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        )}
        <InputField
          type="text"
          lable="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          lable="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Link to={FORGOT_PASSWORD_ROUTE}>Forgot Password</Link>
        <button className="Button" onClick={handleSubmit}>
          Sign {authform === 'signin' ? 'in' : 'up'}
        </button>
      </div>
    </div>
  )
}

export default Auth
