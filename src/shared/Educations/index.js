import React from 'react'
import { dateWithMonthName } from '@utils'

const Educations = (props) => {
  const { educations = [], onEventClick } = props

  return educations.map((item) => (
    <div key={item._id} className="BoxItem">
      <div className="SubTitle">
        <div>
          {item.education} / {item.institute}{' '}
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
        {dateWithMonthName(item.passOut)}
      </div>
      <p className="Paragraph">Marks/Grade: {item.totalMarks}</p>
    </div>
  ))
}

export default Educations
