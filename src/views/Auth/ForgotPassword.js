import React, { useState } from 'react'
import { callSendForgotPassword } from '@api/requestType'
import { RESET_PASSWORD_ROUTE } from '@constants/routers'
import history from '@history'
import { removeSpacesLowerCase } from '@utils'
import { showNotification } from '@shared/Notification'
import { InputField } from '@shared/FormField'

const ForgotPassword = () => {
  const [userDetails, setuserDetails] = useState({})

  const { username, email } = userDetails

  const handleChange = (e) => {
    const { name, value } = e.target
    setuserDetails({ ...userDetails, [name]: removeSpacesLowerCase(value) })
  }

  const handleForgotPassword = async () => {
    const {
      status,
      data: { message },
    } = await callSendForgotPassword({ username, email })

    if (status === 200) {
      showNotification('info', message)
      history.push(RESET_PASSWORD_ROUTE)
    }
  }

  return (
    <div className="Auth">
      <div className="Box">
        <InputField
          type="text"
          lable="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <InputField
          type="text"
          lable="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <button className="Button" onClick={handleForgotPassword}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
