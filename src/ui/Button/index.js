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
    {
      spinner &&
        <div className='button-spinner'><Spinner transparent /></div>
    }

    <div className={`button-text ${spinner ? 'hide-button-text' : ''}`}>
      {children}
    </div>
  </button>
))

export const IconButton = forwardRef(({ className, type, icon, spinner, disabled, children, ...props }, ref) => (
  <button
    className={`icon-button ${type ? `icon-button-${type}` : ''} ${className || ''}`}
    disabled={disabled || spinner || false}
    ref={ref}
    {...props}
  >
    <div className='icon-button-icon'>
      {
        spinner
          ? <Spinner size='small' transparent />
          : <Icon name={icon || 'add'} size='small' />
      }
    </div>
    {
      children &&
        <div className='icon-button-text'>
          {children}
        </div>
    }
  </button>
))

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
  children: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  spinner: PropTypes.bool,
  type: PropTypes.string
}

IconButton.defaultProps = {
  disabled: false,
  spinner: false
}
