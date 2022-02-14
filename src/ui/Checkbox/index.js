import React from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as IconCheck } from './icon-check.svg'

import './styles.scss'

export function Checkbox ({ name, value, label, disabled, checked, onChange, ...props }) {
  const id = nanoid()

  return (
    <div className='checkbox' {...props}>
      <div className='checkbox-inner'>
        <div className='check-wrapper'>
          <input id={`check-${id}`} type='checkbox' name={name} value={value} disabled={disabled || false} checked={checked} onChange={onChange} {...props} tabIndex='0' />
          <div className='check'>
            <IconCheck />
          </div>
        </div>
        {
          label && <label className={disabled ? 'disabled' : ''} htmlFor={`check-${id}`}>{label}</label>
        }
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

Checkbox.defaultProps = {
  checked: false
}
