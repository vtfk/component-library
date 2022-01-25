import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function RadioButton ({ name, value, label, disabled, onChange, ...props }) {
  return (
    <div className='radio-button' {...props}>
      <div className='radio-button-inner'>
        <div className='radio-wrapper'>
          <input id={`radio-${name}-${value}`} type='radio' name={name} value={value} disabled={disabled || false} onChange={onChange} {...props} />
          <div className='radio' />
        </div>
        <label className={disabled ? 'disabled' : ''} htmlFor={`radio-${name}-${value}`}>{label}</label>
      </div>
    </div>
  )
}

RadioButton.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired
}
