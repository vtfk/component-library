import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import './styles.scss'

export function TextField ({ type, className, placeholder, required, value, id, disabled, noBorder, rows, rounded, onChange, onFocus, onBlur, error, hint, alwaysHint, alwaysPlaceholder, hidePlaceholder, hideDetails, style, ...props }) {
  const [_value, setValue] = useState('');
  const [focusState, setFocusState] = useState(false)
  const [labelId] = useState(id || `id${nanoid()}`)

  /*
    Use effect
  */
  useEffect(() => {
    if(value !== undefined) setValue(value)
  }, [value])

  /*
    Functions
  */
  const handleChange = (event) => {
    if(!event) return;
    setValue(event.target.value);
  }

  const handleFocus = (event) => {
    setFocusState(true)
    if (onFocus && typeof onFocus === 'function') onFocus(event)
  }

  const handleBlur = (event) => {
    setFocusState(false)
    if (onBlur && typeof onBlur === 'function') onBlur(event)
  }

  /*
    Memos
  */
  // Determine if the component has data or not
  const hasData = useMemo(() => {
    if(_value !== undefined && _value !== '') return true;
    return false;
  }, [_value, value])
  
  // Determine what classes the component should have
  const componentClasses = useMemo(() => {
    let classes = 'textfield';
    if(type && typeof type === 'string') classes += ` ${type}`
    if(required) classes += ' required-input';
    if(rounded) classes += ' rounded';
    if(noBorder) classes += ' no-border'
    if(focusState) classes += ' focused'
    if(error) classes += ' error';
    if(hasData) classes += ' has-data'
    classes = classes.trim();

    return classes;
  }, [hasData, focusState, type, required, rounded, error])

  // Determine what classes the input should have
  const inputClasses = useMemo(() => {
    let classes = '';
    if(type) classes += ` ${type}`
    if(noBorder) classes += ' no-border'
    if(focusState) classes += ' focused'
    classes = classes.trim();
    
    return classes;
  }, [className, noBorder, rounded, focusState])

  /*
    Render
  */
  return (
    <div className={componentClasses} style={style}>
      {
        hidePlaceholder !== false &&
        <div className='textfield-placeholder'>
          {
            (hasData || alwaysPlaceholder) && placeholder &&
            <label htmlFor={labelId} className='placeholder-label'>
              {placeholder}
            </label>
          }
        </div>
      }
      {
        rows &&
        <textarea
          id={labelId}
          type={type || 'text'}
          disabled={disabled || false}
          value={_value}
          placeholder={placeholder || ''}
          className={inputClasses}
          rows={rows}
          aria-invalid={!!error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      }
      {
        !rows &&
        <input
          id={labelId}
          type={type || 'text'}
          className={inputClasses}
          disabled={disabled || false}
          aria-invalid={!!error}
          placeholder={placeholder || ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={_value}
          {...props}
        />
      }
      {
        hideDetails !== true &&
          <div className='textfield-details'>
          {
            error &&
            <p role='alert' aria-live='assertive' className='details-text'>
              {error.message || error}
            </p>
          }
          {
            (!error && focusState || alwaysHint) &&
            <p role='alert' aria-live='assertive' className='details-text'>
              {hint}
            </p>
          }
        </div>
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
  hint: PropTypes.string,
  id: PropTypes.string,
  inputRef: PropTypes.object,
  noBorder: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rounded: PropTypes.bool,
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  style: PropTypes.object,
  type: PropTypes.oneOf([
    'email',
    'number',
    'password',
    'text'
  ]),
  value: PropTypes.string
}
