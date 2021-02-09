import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../Icon'
import { Spinner } from '../Spinner'

import './styles.scss'

export const Button = forwardRef(({ className, type, size, spinner, disabled, children, ...props }, ref) => (
  <button
    className={`button button-${type || 'primary'} button-${size || 'medium'} ${className || ''}`}
    disabled={disabled || spinner || false}
    ref={ref}
    {...props}
  >
    {spinner ? <Spinner size='small' /> : children}
  </button>
))

export const IconButton = forwardRef(({ className, type, icon, children, ...props }, ref) => (
  <button
    className={`icon-button-link ${type ? `icon-button-link-${type}` : ''} ${className}`}
    ref={ref}
    {...props}
  >
    <div className='icon-button-link-icon'>
      <Icon name={icon || 'add'} size='small' />
    </div>
    <div className='icon-button-link-text'>
      {children}
    </div>
  </button>
))

export const IconButtonLink = IconButton

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  spinner: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'secondary', 'secondary2'])
}

Button.defaultProps = {
  disabled: false,
  size: 'medium',
  spinner: false,
  type: 'primary'
}

IconButton.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string
}
