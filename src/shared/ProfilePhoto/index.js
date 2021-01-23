import React, { useState, useCallback } from 'react'
import { useStore } from '@store'
import { callUploadUserProfilePhoto } from '@api/requestType'
import { setUserContactInfoAction } from '@actions'
import { showNotification } from '@shared/Notification'
import { DEFAULT_PROFILE_URL } from '@constants'
import { InputField } from '@shared/FormField'
import getCroppedImg from './cropImage'
import Cropper from 'react-easy-crop'
import './index.scss'

const ProfilePhoto = (props) => {
  const { onUpload } = props
  const {
    state: { userDetails: { contactInfo = {} } = {} },
    dispatch,
  } = useStore()

  const { name, userPhoto: { imgUrl } = {} } = contactInfo

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const getFileBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })
  }

  const [selectImg, setSelectImg] = useState(imgUrl)

  const saveImage = async (imgUrl) => {
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
  }

  const handleChange = async (e) => {
    let file = e.target.files[0]
    let fileSize = (file.size / 1024 / 1024).toFixed(2)
    const fileType = file['type']
    const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png']
    const imgUrl = await getFileBase64(file)
    if (!validImageTypes.includes(fileType)) {
      showNotification('error', 'Please upload file type JPG/JPEG/PNG')
    } else if (fileSize >= 5) {
      showNotification('error', 'Please upload file size less than 1MB')
    } else {
      setSelectImg(imgUrl)
    }
  }
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectImg,
        croppedAreaPixels,
        rotation,
      )
      saveImage(croppedImage)
    } catch (e) {
      showNotification('error', e)
    }
  }, [croppedAreaPixels, rotation])

  return (
    <>
      <div className={`ProfilePhoto ${onUpload && 'Upload'}`}>
        <div className="imgWrapper">
          <Cropper
            image={selectImg}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={5 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        <img src={selectImg || DEFAULT_PROFILE_URL} />
        {!onUpload && (
          <>
            <h1 className="Name">{name}</h1>
          </>
        )}
      </div>
      {onUpload && (
        <>
          <div className="ButtonGroup">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
            />
            <button className="Button" onClick={showCroppedImage}>
              Croppe Image
            </button>
          </div>
          <div className="Row">
            <div className="Col Col6">
              <InputField
                lable="Zoom"
                name="zoom"
                type="range"
                value={zoom}
                min={1}
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
            <div className="Col Col6">
              <InputField
                lable="Rotate"
                name="rotation"
                type="range"
                value={rotation}
                min={1}
                max={360}
                onChange={(e) => setRotation(e.target.value)}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProfilePhoto
