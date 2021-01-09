import React, { useState } from 'react'
import { useStore } from '@store'
import { InputField } from '@shared/FormField'
import { callSetUserLanguages } from '@api/requestType'
import { setUserLanguagesAction } from '@actions/'
import './index.scss'

const Languages = () => {
  const {
    state: {
      userDetails: { languages: { _id, languages: reqLang = [] } = {} } = {},
    },
    dispatch,
  } = useStore()
  const [languages, setLanguages] = useState(reqLang)
  const [languageItem, setLanguageItem] = useState({})

  const { language, percentage } = languageItem

  const handleChange = (e) => {
    const { name, value } = e.target
    setLanguageItem({ ...languageItem, [name]: value })
  }

  const handleAddLanguage = () => {
    const newLang = languages.filter((item) => item.language !== language)
    setLanguages([...newLang, languageItem])
    setLanguageItem({})
  }

  const handleRemove = (language) => {
    const newLang = languages.filter((item) => item.language !== language)
    setLanguages(newLang)
  }

  const payload = {
    _id,
    languages,
  }

  const handleSubmit = async () => {
    const { status, data } = await callSetUserLanguages(payload)
    if (status) {
      dispatch(setUserLanguagesAction(data))
    }
  }

  return (
    <div className="Languages">
      <div className="Box">
        <h3 className="Title">Languages</h3>
        <div className="TagsGroup">
          {languages &&
            languages.map((item) => {
              return (
                <span key={item.language} className="Tag">
                  {item.language} : {item.percentage}
                  <i
                    className="fas fa-times Btn"
                    onClick={() => handleRemove(item.language)}
                  ></i>
                </span>
              )
            })}
        </div>
        <div className="Row">
          <div className="Col Col12 Nowrap Addons">
            <InputField
              lable="Language"
              name="language"
              value={language}
              onChange={handleChange}
            />

            <InputField
              type="number"
              lable="Percentage"
              name="percentage"
              value={percentage}
              onChange={handleChange}
            />
            <button className="Button" onClick={handleAddLanguage}>
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

export default Languages
