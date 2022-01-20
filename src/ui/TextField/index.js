import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import './styles.scss'

export function TextField ({ type, className, placeholder, value, id, disabled, noBorder, rows, rounded, onFocus, onBlur, error, inputRef, ...props }) {
  const [focusState, setFocusState] = useState(false)
  const [labelId] = useState(id || `id${nanoid()}`)

  const handleFocus = (event) => {
    setFocusState(true)
    if (onFocus && typeof onFocus === 'function') onFocus(event)
  }

  const handleBlur = (event) => {
    setFocusState(false)
    if (onBlur && typeof onBlur === 'function') onBlur(event)
  }

  return (
    <div className={`
        ${rounded ? 'rounded-input' : 'text-field'}
        ${type || 'text'}
        ${error ? 'error' : ''}
    `}
    >
      <div className={`
        ${className || ''}
        ${noBorder && !rounded ? 'no-border' : ''} 
        ${focusState ? 'focused' : ''}
      `}
      >
        {
          value && value !== '' && !rounded &&
            <label htmlFor={labelId} className='placeholder-label'>
              {placeholder}
            </label>

        }

        {
          rows &&
            <textarea
              id={labelId}
              type={type || 'text'}
              disabled={disabled || false}
              aria-invalid={!!error}
              placeholder={placeholder || ''}
              rows={rows}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              ref={inputRef}
              {...props}
            />
        }

        {
          !rows &&
            <input
              id={labelId}
              type={type || 'text'}
              disabled={disabled || false}
              aria-invalid={!!error}
              placeholder={placeholder || ''}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              ref={inputRef}
              {...props}
            />
        }
      </div>

      {
        error &&
          <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
            {error.message || error}
          </label>
      }
    </div>
  )
}

TextField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  id: PropTypes.string,
  inputRef: PropTypes.object,
  noBorder: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  type: PropTypes.oneOf([
    'email',
    'number',
    'password',
    'text'
  ]),
  value: PropTypes.string.isRequired
}
