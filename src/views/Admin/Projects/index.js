import React, { useState } from 'react'
import { InputField, TextArea } from '@shared/FormField'

import { callSetUserProjectAction } from '@api/requestType'

const Projects = () => {
  const [project, setProject] = useState({})

  const { projectname, projectLink, technologies, describe } = project

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  const payload = {
    project,
  }

  const handleSubmit = () => {
    const { status, data } = callSetUserProjectAction(payload)
    console.log(status, data)
  }

  return (
    <div className="Projects">
      <div className="Box">
        <h3 className="Title">Projects</h3>
        <div className="Row">
          <div className="Col Col6">
            <InputField
              lable="Project Name"
              name="projectname"
              value={projectname}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Project Link"
              name="projectLink"
              value={projectLink}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col12">
            <InputField
              lable="Technologies"
              name="technologies"
              value={technologies}
              placeholder="HTML, CSS, JavaScript"
              onChange={handleChange}
            />
          </div>
          <div className="Col Col12">
            <TextArea
              lable="Describe your role and responsibilities"
              name="describe"
              value={describe}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="ButtonGroup">
          <button className="Button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Projects
