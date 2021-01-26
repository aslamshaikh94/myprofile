import React, { memo } from 'react'
import { useStore } from '@store'
import ViewProjects from '@shared/ViewProjects'
import './index.scss'

const Projects = () => {
  const {
    state: { userDetails: { projects = [] } = {} },
  } = useStore()

  return (
    <div className="Projects">
      <div className="MainTitle">
        <i className="fas fa-layer-group"></i>
        Projects
      </div>
      <ViewProjects projects={projects} />
    </div>
  )
}

export default memo(Projects)
