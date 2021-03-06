import React, { memo } from 'react'
import Header from '@shared/Header'
import ContactInfo from './ContactInfo'
import Skills from './Skills'
import Languages from './Languages'
import Employment from './Employment'
import Education from './Education'
import Projects from './Projects'
import './index.scss'

const Admin = () => {
  return (
    <div>
      <Header />
      <div className="Admin">
        <div className="Container">
          <div className="Row">
            <div className="Col Col6 ColGap">
              <ContactInfo />
              <Skills />
              <Languages />
            </div>
            <div className="Col Col6 ColGap">
              <Employment />
              <Projects />
              <Education />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Admin)
