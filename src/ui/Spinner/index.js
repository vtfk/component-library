import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function Spinner ({ size, transparent, className, ...props }) {
  return (
    <svg
      className={`spinner ${size || ''} ${className || ''}`}
      viewBox='0 0 50 50'
      focusable='false'
      title='Laster...'
      aria-label='Laster innhold...'
      {...props}
    >
      <title>{props.title || 'Laster...'}</title>
      <circle cx='25' cy='25' r='20' style={transparent ? { stroke: 'none' } : {}} />
      <circle cx='25' cy='25' r='20' />
    </svg>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['auto', 'small', 'medium', 'large', 'xlarge']),
  title: PropTypes.string,
  transparent: PropTypes.bool
}
