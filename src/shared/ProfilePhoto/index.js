import React from 'react'
import { useStore } from '@store'

import './index.scss'

const ProfilePhoto = (props) => {
  const { onUpload } = props
  const {
    state: { userDetails: { contactInfo: { name } = {} } = {} },
  } = useStore()

  return (
    <div className={`ProfilePhoto ${onUpload && 'Upload'}`}>
      <img src={`//joeschmoe.io/api/v1/${name}`} />
      {!onUpload && <h1 className="Name">{name}</h1>}
    </div>
  )
}

export default ProfilePhoto
