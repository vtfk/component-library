import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function Switch ({ isActive, onClick, disabled, ...props }) {
  return (
    <button
      className={`switch ${isActive ? 'active' : ''}`}
      aria-label='Bryter'
      aria-checked={isActive ? 'true' : 'false'}
      role='switch'
      disabled={disabled || false}
      onClick={onClick}
    />
  )
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}
