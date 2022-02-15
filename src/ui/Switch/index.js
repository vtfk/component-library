import React from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import './styles.scss'

export function Switch ({ isActive, label, onClick, disabled, ...props }) {
  const id = nanoid()
  return (
    <div className='switch'>
      <div className='switch-wrapper'>
        <button
          id={`switch-${id}`}
          className={`switch-element ${isActive ? 'active' : ''}`}
          aria-label='Bryter'
          aria-checked={isActive ? 'true' : 'false'}
          role='switch'
          disabled={disabled || false}
          onClick={onClick}
        />
        {
          label && <label className={disabled ? 'disabled' : ''} htmlFor={`switch-${id}`}>{label}</label>
        }
      </div>
    </div>
  )
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func
}
