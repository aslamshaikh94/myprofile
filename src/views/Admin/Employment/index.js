import React, { useEffect, useState } from 'react'
import { useStore } from '@store'
import { setUserEmploymentAction } from '@actions/'
import {
  callSetUserEmployment,
  callDeleteUserEmployment,
} from '@api/requestType'
import { InputField, TextArea, Checkbox } from '@shared/FormField'
import Experiences from '@shared/Experiences'

const Employment = () => {
  const {
    state: { userDetails: { employments = [] } = {} },
    dispatch,
  } = useStore()

  const [employment, setEmployment] = useState({ workedTill: true })

  const {
    organization,
    designation,
    workedFrom,
    workedTill,
    describe,
  } = employment

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployment({ ...employment, [name]: value })
  }

  const handleChecked = (e) => {
    const { name, value, checked } = e.target
    const checkedVal = checked ? value : ''
    setEmployment({ ...employment, [name]: checkedVal })
  }

  const handleAcction = async (id, event) => {
    if (event === 'delete') {
      const {
        status,
        data: { _id },
      } = await callDeleteUserEmployment({ _id: id })
      if (status) {
        const newEmployments = employments.filter((item) => item._id !== id)
        dispatch(setUserEmploymentAction({ employments: newEmployments }))
      }
    } else {
      setEmployment(...employments.filter((item) => item._id === id))
    }
  }

  const payload = {
    employment,
  }

  const [isPresent, setIsPresent] = useState()

  useEffect(() => {
    let date = []
    employments.forEach((e) => {
      date.push(e.workedTill)
    })
    setIsPresent(date.includes('present'))
  }, [employments])

  console.log(isPresent)

  const handleSubmit = async () => {
    const { status, data } = await callSetUserEmployment(payload)
    if (status === 200) {
      const newEmployments = employments.filter((item) => item._id !== data._id)
      dispatch(
        setUserEmploymentAction({ employments: [...newEmployments, data] }),
      )
      setEmployment({})
    }
  }

  return (
    <div className="Employment">
      <div className="Box">
        <h3 className="Title">Employment</h3>

        <Experiences employments={employments} onEventClick={handleAcction} />

        <div className="Row">
          <div className="Col Col6">
            <InputField
              lable="Your Organization"
              name="organization"
              value={organization}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Your Designation"
              name="designation"
              value={designation}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              type="month"
              lable="Started Working From"
              name="workedFrom"
              value={workedFrom}
              onChange={handleChange}
            />
          </div>
          <div className="Col Col6">
            <InputField
              lable="Present"
              type="month"
              name="workedTill"
              value={workedTill}
              onChange={handleChange}
              disabled={workedTill === 'present'}
            />
            {(!isPresent || !workedTill || workedTill === 'present') && (
              <Checkbox
                lable="Present"
                type="checkbox"
                name="workedTill"
                value="present"
                checked={workedTill === 'present'}
                onChange={handleChecked}
              />
            )}
          </div>
          <div className="Col Col12">
            <TextArea
              lable="Describe your Job Profile"
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

export default Employment
