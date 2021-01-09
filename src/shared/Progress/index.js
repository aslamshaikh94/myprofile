import React from 'react'
import './index.scss'

const Progress = (props) => {
  const { lable, value, percentShow = true } = props

  return (
    <div className="ProgressGroup">
      <span className="Lable">{lable}</span>
      <div className="ProgressBox">
        <div className="Progress" style={{ width: `${value}%` }}>
          {percentShow && `${value}%`}
        </div>
      </div>
    </div>
  )
}

export default Progress
