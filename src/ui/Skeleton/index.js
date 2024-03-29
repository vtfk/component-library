import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function Skeleton ({ variant = 'text', width, height, randomWidth, className, style, title, ...props }) {
  if (randomWidth) {
    const [min, max] = randomWidth
    width = `${Math.random() * (max - min) + min}%`
  }

  return (
    <span
      className={`skeleton ${variant || ''} ${props.children ? `with-children ${!height ? 'auto-height' : ''} ${!width ? 'auto-width' : ''}` : ''} ${className || ''}`}
      style={{ width, height, ...style }}
      title={title || 'Laster inn...'}
      {...props}
    />
  )
}

Skeleton.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  randomWidth: PropTypes.arrayOf(PropTypes.number),
  style: PropTypes.object,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'circle', 'rectangle']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
