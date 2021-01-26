import React, { memo, useState } from 'react'
import { useStore } from '@store'
import { callSetUserEducation, callDeleteEducation } from '@api/requestType'
import { setUserEducationAction } from '@actions'
import { InputField } from '@shared/FormField'
import Educations from '@shared/Educations'

const Education = () => {
  const {
    state: { userDetails: { educations = [] } = {} },
    dispatch,
  } = useStore()

  const [eduDetail, setEduDetail] = useState({ institute })

  const { institute, education, passOut, totalMarks } = eduDetail

  const handleChange = (e) => {
    const { name, value } = e.target

    setEduDetail({ ...eduDetail, [name]: value })
  }

  const payload = {
    education: eduDetail,
  }

  const handleAcction = async (id, event) => {
    if (event === 'delete') {
      const {
        status,
        data: { _id },
      } = await callDeleteEducation({ _id: id })
      if (status) {
        const newEducations = educations.filter((item) => item._id !== id)
        dispatch(setUserEducationAction({ educations: newEducations }))
      }
    } else {
      setEduDetail(...educations.filter((item, i) => item._id === id))
    }
  }

  const handleSubmit = async () => {
    const { status, data } = await callSetUserEducation(payload)
    if (status === 200) {
      const newEducations = educations.filter((item) => item._id !== data._id)
      dispatch(setUserEducationAction({ educations: [...newEducations, data] }))
      setEduDetail({})
    }
  }

  return (
    <div className="Educations">
      <div className="Box">
        <h3 className="Title">Education</h3>
        <Educations educations={educations} onEventClick={handleAcction} />
        <div className="Row">
          <div className="Col Col6">
            <InputField
              lable="Education"
              name="education"
              value={education}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Board/University/Institute"
              name="institute"
              value={institute}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              type="month"
              lable="Passing Out Year"
              name="passOut"
              value={passOut}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Total Marks/Grade"
              name="totalMarks"
              value={totalMarks}
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

export default memo(Education)
