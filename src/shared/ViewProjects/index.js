import React from 'react'

const ViewProjects = (props) => {
  const { projects = [], onEventClick } = props

  projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return projects.map((item) => (
    <div key={item._id} className="BoxItem">
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
        <a href={item.projectLink} className="LinkNone" target="_blank">
          <i className="fas fa-external-link-alt"></i> View Project
        </a>
      </div>
      <p className="Paragraph">Technologies: {item.technologies}</p>
      <p className="Paragraph">{item.describe}</p>
    </div>
  ))
}

export default ViewProjects
