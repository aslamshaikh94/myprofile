import React, { memo } from 'react'
import { useStore } from '@store'
import Experiences from '@shared/Experiences'
import './index.scss'

const WorkExperience = () => {
  const {
    state: { userDetails: { employments = [] } = {} },
  } = useStore()

  return (
    <div className="WorkExperience">
      <div className="MainTitle">
        <i className="fa fa-suitcase"></i>
        Employment
      </div>
      <Experiences employments={employments} />
    </div>
  )
}

export default memo(WorkExperience)
