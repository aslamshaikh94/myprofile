import React from 'react'
import { useStore } from '@store'
import Educations from '@shared/Educations'
import './index.scss'

const Education = () => {
  const {
    state: { userDetails: { educations = [] } = {} },
  } = useStore()

  return (
    <div className="Education">
      <div className="MainTitle">
        <i className="fa fa-certificate"></i>
        Education
      </div>
      <Educations educations={educations} />
    </div>
  )
}

export default Education
