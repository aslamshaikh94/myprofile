import React from 'react'
import WorkExperience from './WorkExperience'
import Education from './Education'
import './index.scss'

const RightSections = () => {
  return (
    <div className="RightSections">
      <WorkExperience />
      <Education />
    </div>
  )
}

export default RightSections
