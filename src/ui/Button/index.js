import React from 'react'
import PropTypes from 'prop-types'

import { Link } from '../Typography'
import { Icon } from '../Icon'

import './styles.scss'

export function Button ({ className, type, children, ...props }) {
  return (
    <button className={`button button-${type} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function IconButtonLink ({ className, type, icon, children, ...props }) {
  return (
    <Link
      className={`icon-button-link ${type ? `icon-button-link-${type}` : ''} ${className}`}
      {...props}
    >
      <div className='icon-button-link-icon'>
        <Icon name={icon} size='small' />
      </div>
      <div className='icon-button-link-text'>
        {children}
      </div>
    </Link>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
}

IconButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
}
