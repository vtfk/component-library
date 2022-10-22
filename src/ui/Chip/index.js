import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export const types = [
  'error',
  'information',
  'success',
  'warning'
]

export function Chip ({ fontSize, icon, message, type, style, ...props }) {
  const getStyle = value => {
    if (!value) return undefined
    else if (typeof value === 'string') return value
    else if (Array.isArray(value)) return value.join(' ')
  }

  return (
    <div className={`chip ${type}`} {...props}>
      {
        icon &&
          <div className='chip-container'>
            <div className='chip-icon'>{icon}</div>
            <div className={`chip-message${style ? ` ${getStyle(style)}` : ''}`} style={{ fontSize }}>{message}</div>
          </div>
      }

      {
        !icon && <div className={`chip-message${style ? ` ${getStyle(style)}` : ''}`} style={{ fontSize }}>{message}</div>
      }
    </div>
  )
}

Chip.propTypes = {
  fontSize: PropTypes.any,
  icon: PropTypes.object,
  message: PropTypes.string.isRequired,
  style: PropTypes.oneOf([
    'bold',
    'italic',
    'lowercase',
    'uppercase',
    'overline',
    'striketrough',
    'underline'
  ]),
  type: PropTypes.oneOf(types).isRequired
}

Chip.defaultProps = {
  fontSize: '0.8rem'
}
