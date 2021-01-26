import React, { memo, useState } from 'react'
import { useStore } from '@store'
import { InputField, TextArea } from '@shared/FormField'
import ViewProjects from '@shared/ViewProjects'
import { callSetUserProject, callDeleteUserProject } from '@api/requestType'
import { setUserProjectAction } from '@actions'

const Projects = () => {
  const {
    state: { userDetails: { projects = [] } = {} },
    dispatch,
  } = useStore()

  const [project, setProject] = useState({})

  const { projectname, projectLink, technologies, describe } = project

  const handleChange = (e) => {
    const { name, value } = e.target
    setProject({ ...project, [name]: value })
  }

  const payload = {
    project,
  }

  const handleAcction = async (id, event) => {
    if (event === 'delete') {
      const { status } = await callDeleteUserProject({ _id: id })
      if (status) {
        const newProjects = projects.filter((item) => item._id !== id)
        dispatch(setUserProjectAction({ projects: newProjects }))
      }
    } else {
      setProject(...projects.filter((item) => item._id === id))
    }
  }

  const handleSubmit = async () => {
    const { status, data } = await callSetUserProject(payload)

    if (status === 200) {
      const newProjects = projects.filter((item) => item._id !== data._id)
      dispatch(setUserProjectAction({ projects: [...newProjects, data] })),
        setProject({})
    }
  }

  return (
    <div className="BoxItem">
      <div className="Box">
        <h3 className="Title">Projects</h3>
        <ViewProjects projects={projects} onEventClick={handleAcction} />
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

export default memo(Projects)
