import React from 'react'

const ViewProjects = (props) => {
  const { projects = [], onEventClick } = props

  return projects.map((item) => (
    <div key={item._id} className="ViewProjects">
      <div className="SubTitle">
        <div>{item.projectname}</div>
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
        <i className="far fa-calendar-alt"></i> {item.projectLink}
      </div>
      <p className="Paragraph">Marks/Grade: {item.technologies}</p>
      <p className="Paragraph">Marks/Grade: {item.describe}</p>
    </div>
  ))
}

export default ViewProjects
