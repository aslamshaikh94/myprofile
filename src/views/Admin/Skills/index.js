import React, { useState } from 'react'
import { useStore } from '@store'
import { InputField } from '@shared/FormField'
import { callSetUserSkills } from '@api/requestType'
import { setUserSkillsAction } from '@actions/'
import './index.scss'

const Skills = () => {
  const {
    state: {
      userDetails: { skills: { skills: userSkills = [], _id } = {} },
    },
    dispatch,
  } = useStore()

  const [skills, setSkills] = useState(userSkills)
  const [skillItem, setSkillItem] = useState({})

  const { skill, percentage } = skillItem

  const handleChange = (e) => {
    const { name, value } = e.target
    setSkillItem({ ...skillItem, [name]: value })
  }

  const handleAddSkill = () => {
    const newSkills = skills.filter((item) => item.skill !== skill)
    setSkills([...newSkills, skillItem])
    setSkillItem({})
  }

  const handleRemove = (skill) => {
    const newSkills = skills.filter((item) => item.skill !== skill)
    setSkills(newSkills)
  }

  const payload = {
    _id,
    skills,
  }

  const handleSubmit = async () => {
    const { status, data } = await callSetUserSkills(payload)
    if (status) {
      dispatch(setUserSkillsAction(data))
    }
  }

  return (
    <div className="Skills">
      <div className="Box">
        <h3 className="Title">Skills</h3>
        <div className="TagsGroup">
          {skills &&
            skills.map((item) => {
              return (
                <span key={item.skill} className="Tag">
                  {item.skill} : {item.percentage}
                  <i
                    className="fas fa-times Btn"
                    onClick={() => handleRemove(item.skill)}
                  ></i>
                </span>
              )
            })}
        </div>
        <div className="Row">
          <div className="Col Col12 Nowrap Addons">
            <InputField
              lable="Skill"
              name="skill"
              value={skill}
              onChange={handleChange}
            />

            <InputField
              type="number"
              lable="Percentage"
              name="percentage"
              value={percentage}
              onChange={handleChange}
            />
            <button className="Button" onClick={handleAddSkill}>
              Add
            </button>
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

export default Skills
