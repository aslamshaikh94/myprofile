import React, { useEffect, useState } from 'react'
import { useStore } from '@store'
import { callSetContactInfo } from '@api/requestType'
import { setUserContactInfoAction } from '@actions'
import { InputField, SwitchButton } from '@shared/FormField'
import ProfilePhoto from '@shared/ProfilePhoto'

const ContactInfo = () => {
  const {
    state: { userDetails: { contactInfo: conInfo = {} } = {} } = {},
    dispatch,
  } = useStore()

  const [contactInfo, setContactInfo] = useState({
    personalInfo: true,
    ...conInfo,
  })

  useEffect(() => {
    setContactInfo({ ...contactInfo, userPhoto: conInfo.userPhoto })
  }, [conInfo.userPhoto])

  const {
    name,
    designation,
    address,
    email,
    mobile,
    gitlink,
    linkedin,
    personalInfo,
  } = contactInfo

  const payload = {
    contactInfo,
  }

  const handleSubmit = async () => {
    const { status, data } = await callSetContactInfo(payload)
    if (status === 200) {
      dispatch(setUserContactInfoAction(data))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setContactInfo({ ...contactInfo, [name]: value })
  }

  return (
    <div className="ContactInfoForm">
      <div className="Box">
        <h3 className="Title">Contact Information</h3>
        <div className="Row">
          <div className="Col Col12">
            <ProfilePhoto onUpload />
          </div>
          <div className="Col Col12">
            <SwitchButton
              lable="Personal Information*"
              name="personalInfo"
              optionsName={['Public', 'Private']}
              optionsValue={[true, false]}
              checked={personalInfo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="Row">
          <div className="Col Col6">
            <InputField
              lable="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Designation"
              name="designation"
              value={designation}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Address*"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Email*"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Mobile*"
              type="number"
              name="mobile"
              value={mobile}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Git link*"
              type="url"
              name="gitlink"
              value={gitlink}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Linkedin*"
              type="url"
              name="linkedin"
              value={linkedin}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="ButtonGroup">
          <button className="Button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
