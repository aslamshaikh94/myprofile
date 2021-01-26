import React, { memo, useState } from 'react'
import { callResetPassword } from '@api/requestType'
import { LOGIN_ROUTE } from '@constants/routers'
import { InputField } from '@shared/FormField'
import { showNotification } from '@shared/Notification'
import history from '@history'

const ResetPassword = () => {
  const [userDetail, setUserDetail] = useState({})
  const { email, password } = userDetail

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetail({ ...userDetail, [name]: value })
  }
  const handleSubmit = async () => {
    const token = history.location.pathname.replace('/resetpassword/', '')
    const {
      status,
      data: { message },
    } = await callResetPassword({ ...userDetail, token })

    if (status === 200) {
      showNotification('info', message)
      history.push(LOGIN_ROUTE)
    }
  }

  return (
    <div className="Auth">
      <div className="Box">
        <InputField
          lable="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          lable="New Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <button className="Button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default memo(ResetPassword)
