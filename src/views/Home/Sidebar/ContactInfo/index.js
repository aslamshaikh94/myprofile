import React from 'react'
import { useStore } from '@store'
import './index.scss'

const ContactInfo = () => {
  const {
    state: {
      userDetails: {
        contactInfo: {
          mobile,
          email,
          address,
          designation,
          gitlink,
          linkedin,
        } = {},
      } = {},
    },
  } = useStore()

  return (
    <div className="ContactInfo">
      <span className="Item">
        <i className="fa fa-briefcase icon"></i> {designation}
      </span>
      <span className="Item">
        <i className="fa fa-home icon"></i> {address}
      </span>
      <span className="Item">
        <i className="fa fa-envelope icon"></i> {email}
      </span>
      <span className="Item">
        <i className="fa fa-phone icon"></i> {mobile}
      </span>
      {gitlink && (
        <span className="Item">
          <i className="fab fa-git-square icon"></i>{' '}
          <a href={gitlink} target="_blank">
            Git Repository
          </a>
        </span>
      )}
      {linkedin && (
        <span className="Item">
          <i className="fab fa-linkedin icon"></i>{' '}
          <a href={linkedin} target="_blank">
            Linkedin
          </a>
        </span>
      )}
    </div>
  )
}

export default ContactInfo
