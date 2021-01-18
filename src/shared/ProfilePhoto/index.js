import React, { useState } from 'react'
import { useStore } from '@store'
import { callUploadUserProfilePhoto } from '@api/requestType'
import { setUserContactInfoAction } from '@actions'
import { showNotification } from '@shared/Notification'
import './index.scss'

const ProfilePhoto = (props) => {
  const { onUpload } = props
  const {
    state: { userDetails: { contactInfo = {} } = {} },
    dispatch,
  } = useStore()

  const { name, userPhoto: { imgUrl } = {} } = contactInfo

  const getFileBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })
  }

  const handleChange = async (e) => {
    let file = e.target.files[0]
    let fileSize = (file.size / 1024 / 1024).toFixed(2)
    const fileType = file['type']
    const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png']

    if (!validImageTypes.includes(fileType)) {
      showNotification('error', 'Please upload file type JPG/JPEG/PNG')
    } else if (fileSize >= 1) {
      showNotification('error', 'Please upload file size less than 1MB')
    } else {
      const imgUrl = await getFileBase64(file)
      const { status, data } = await callUploadUserProfilePhoto({
        imgUrl,
      })
      if (status === 200) {
        dispatch(
          setUserContactInfoAction({
            contactInfo: { ...contactInfo, ...data },
          }),
        )
      }
      setError('')
    }
  }

  return (
    <div className={`ProfilePhoto ${onUpload && 'Upload'}`}>
      <img src={imgUrl || `//joeschmoe.io/api/v1/${name}`} />
      {!onUpload && <h1 className="Name">{name}</h1>}
      {onUpload && (
        <input type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} />
      )}
    </div>
  )
}

export default ProfilePhoto
