import React from 'react'
import WorkExperience from './WorkExperience'
import Education from './Education'
import Projects from './Projects'
import './index.scss'

const RightSections = () => {
  return (
    <div className="RightSections">
      <WorkExperience />
      <Education />
      <Projects />
    </div>
  )
}

export default RightSections
