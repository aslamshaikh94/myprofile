import React, { memo } from 'react'
import { useStore } from '@store'
import Progress from '@shared/Progress'

import './index.scss'

const Languages = () => {
  const {
    state: { userDetails: { languages: { languages = [] } = {} } = {} },
  } = useStore()

  return (
    <div className="Languages">
      <div className="MainTitle">
        <i className="fa fa-language"></i> Languages
      </div>
      {languages &&
        languages.map((item) => (
          <Progress
            key={item.language}
            lable={item.language}
            value={item.percentage}
            percentShow={false}
          />
        ))}
    </div>
  )
}

export default memo(Languages)
