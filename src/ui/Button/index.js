import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../Icon'
import { Spinner } from '../Spinner'

import './styles.scss'

function handleClick (e, callback) {
  callback && typeof callback === 'function' && callback(e)
}

export const Button = ({ className, type, size, spinner, disabled, children, onClick, ...props }) => {
  return (
    <button
      className={`button button-${type || 'primary'} button-${size || 'medium'} ${className || ''}`}
      disabled={disabled || spinner || false}
      onClick={(e) => handleClick(e, onClick)}
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
  )
}

export const IconButton = ({ className, bordered, icon, spinner, disabled, onClick, children, ...props }) => {
  return (
    <button
      className={`icon-button ${bordered ? 'icon-button-transparent-bordered' : ''} ${className || ''}`}
      disabled={disabled || spinner || false}
      onClick={(e) => handleClick(e, onClick)}
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
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'small',
    'medium',
    'large'
  ]),
  spinner: PropTypes.bool,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'secondary2'
  ])
}

Button.defaultProps = {
  disabled: false,
  size: 'medium',
  spinner: false,
  type: 'primary'
}

IconButton.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  spinner: PropTypes.bool
}

IconButton.defaultProps = {
  bordered: false,
  disabled: false,
  spinner: false
}
