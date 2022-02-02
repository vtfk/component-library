import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function Switch ({ isActive, onClick, ...props }) {
  return (
    <button
      className={`switch ${isActive ? 'active' : ''}`}
      onClick={onClick}
    />
  )
}

Switch.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}
