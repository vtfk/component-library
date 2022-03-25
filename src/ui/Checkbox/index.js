import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as IconCheck } from './icon-check.svg'

import './styles.scss'

export function Checkbox ({ name, value, label, disabled, checked, checkboxStyle, onChange, onCheckedChange, ...props }) {
  const id = nanoid()
  const [isChecked, setIsChecked] = useState(false)

  const checkboxRef = useRef()

  useEffect(() => {
    // If checked has been passed as a prop, overrule any state
    if (checked !== undefined) setIsChecked(checked)
  }, [checked, isChecked])

  function handleChange (e) {
    // Update the state
    setIsChecked(e.target.checked)

    // Trigger callbacks
    if (onChange && typeof onChange === 'function') onChange(e)
    if (onCheckedChange && typeof onCheckedChange === 'function') onCheckedChange(e.target.checked)
  }

  return (
    <div className='checkbox' {...props}>
      <div className='checkbox-container'>
        <input
          id={`check-${id}`}
          type='checkbox'
          ref={checkboxRef}
          className='checkbox-input'
          name={name} value={value}
          disabled={disabled || false}
          checked={isChecked}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleChange(e)}
          tabIndex='0'
          {...props}
        />
        <div
          className='checkbox-checkarea'
          style={checkboxStyle}
          onClick={(e) => { e.stopPropagation(); checkboxRef.current.click() }}
        >
          <IconCheck />
        </div>
        {
          label && <label className={disabled ? 'disabled' : ''} htmlFor={`check-${id}`}>{label}</label>
        }
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  checkboxStyle: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onCheckedChange: PropTypes.func,
  value: PropTypes.string
}
