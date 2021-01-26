import React, { memo } from 'react'
import { dateWithMonthName } from '@utils'

const Experiences = (props) => {
  const { employments = [], onEventClick } = props

  employments.sort((a, b) => new Date(b.workedFrom) - new Date(a.workedFrom))

  return employments.map((item) => (
    <div key={item._id} className="BoxItem">
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
        {item.workedTill !== 'present' ? (
          dateWithMonthName(item.workedTill)
        ) : (
          <span className="Present"> Present</span>
        )}
      </div>
      <p className="Paragraph">{item.describe}</p>
    </div>
  ))
}

export default memo(Experiences)
