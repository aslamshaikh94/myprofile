import React from 'react'

import './index.scss'

export const InputField = (props) => {
  const { lable, name = '', value = '', ...rest } = props

  return (
    <div className="FormGrop">
      <label>{lable}</label>
      <input name={name} value={value} {...rest} />
    </div>
  )
}
export const Checkbox = (props) => {
  const { lable, name = '', ...rest } = props

  return (
    <div className="FormGrop Checkbox">
      <input id={name} name={name} {...rest} />
      <label htmlFor={name}>{lable}</label>
    </div>
  )
}

export const TextArea = (props) => {
  const { lable, name = '', value = '', ...rest } = props

  return (
    <div className="FormGrop">
      <label>{lable}</label>
      <textarea name={name} value={value} {...rest} />
    </div>
  )
}

export const SwitchButton = (props) => {
  const {
    lable,
    optionsName,
    name,
    optionsValue,
    checked,
    onChange,
    ...all
  } = props

  return (
    <div className="FormGrop">
      <label>{lable}</label>
      <div className="SwitchBtn">
        {optionsName &&
          optionsName.map((inputName, i) => (
            <React.Fragment key={inputName}>
              <input
                id={inputName + i}
                name={name}
                type="radio"
                checked={optionsValue[i] === checked}
                onChange={() =>
                  onChange({ target: { value: optionsValue[i], name } })
                }
                {...all}
                className="toggle toggle-right"
              />
              <label htmlFor={inputName + i} className="btn">
                {inputName}
              </label>
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}
