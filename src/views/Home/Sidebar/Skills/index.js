import React, { memo } from 'react'
import Progress from '@shared/Progress'
import { useStore } from '@store'
import './index.scss'

const Skills = () => {
  const {
    state: { userDetails: { skills: { skills = [] } = {} } = {} },
  } = useStore()

  return (
    <div className="Skills">
      <div className="MainTitle">
        <i className="fa fa-asterisk"></i> Skills
      </div>
      {skills &&
        skills.map((item) => (
          <Progress
            key={item.skill}
            lable={item.skill}
            value={item.percentage}
          />
        ))}
    </div>
  )
}
export default memo(Skills)
