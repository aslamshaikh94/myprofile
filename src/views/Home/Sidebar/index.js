import React, { memo } from 'react'
import ProfilePhoto from '@shared/ProfilePhoto'
import ContactInfo from './ContactInfo'
import Skills from './Skills'
import Languages from './Languages'

import './index.scss'

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ProfilePhoto />
      <ContactInfo />
      <Skills />
      <Languages />
    </div>
  )
}

export default memo(Sidebar)
