import React from 'react'
import { useStore } from '@store'

import './index.scss'

const ProfilePhoto = () => {
  const {
    state: { userDetails: { contactInfo: { name } = {} } = {} },
  } = useStore()

  return (
    <div className="ProfilePhoto">
      <img src="https://agencia-fotografia.com/wp-content/uploads/2019/08/Linkedin-photo-session.jpg" />
      <h1 className="Name">{name}</h1>
    </div>
  )
}

export default ProfilePhoto
