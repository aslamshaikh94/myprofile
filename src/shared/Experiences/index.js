import React from 'react'
import { dateWithMonthName } from '@utils'
import './index.scss'

const Experiences = (props) => {
  const { employments = [], onEventClick } = props

  return employments.map((item) => (
    <div key={item._id} className="Experiences">
      <div className="SubTitle">
        <div>
          {item.designation} / {item.organization}{' '}
        </div>
        {onEventClick && (
          <div className="ButtonGroup">
            <button
              className="Button BtnSm"
              onClick={() => onEventClick(item._id, 'delete')}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className="Button BtnSm"
              onClick={() => onEventClick(item._id, 'edit')}
            >
              <i className="fas fa-pen"></i>
            </button>
          </div>
        )}
      </div>
      <div className="Calendar">
        <i className="far fa-calendar-alt"></i>{' '}
        {dateWithMonthName(item.workedFrom)} -{' '}
        {dateWithMonthName(item.workedTill)}
      </div>
      <p className="Paragraph">{item.describe}</p>
    </div>
  ))
}

export default Experiences
