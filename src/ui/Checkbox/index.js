import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as IconCheck } from './icon-check.svg'

import './styles.scss'

export function Checkbox ({ name, value, label, disabled, checked, onChange, ...props }) {
  return (
    <div className='checkbox' {...props}>
      <div className='checkbox-inner'>
        <div className='check-wrapper'>
          <input id={`check-${name}-${value}`} type='checkbox' name={name} value={value} disabled={disabled || false} checked={checked} onChange={onChange} {...props} tabIndex='0' />
          <div className='check'>
            <IconCheck />
          </div>
        </div>
        <label className={disabled ? 'disabled' : ''} htmlFor={`check-${name}-${value}`}>{label}</label>
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired
}

Checkbox.defaultProps = {
  checked: false
}
