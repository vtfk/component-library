import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import DatePicker, { registerLocale } from 'react-datepicker'
import nb from 'date-fns/locale/nb'

import { ReactComponent as IconCalendar } from './icon-calendar.svg'
import { Icon } from '../Icon'

import './styles.scss'

export function Datepicker ({ placeholder, hidePlaceholder, alwaysPlaceholder, hint, alwaysHint, hideDetails, showClear, closeOnSelect, label, selected, id, isOpen, disabled, required, error, placement, onChange, onFocus, onBlur, ...props }) {
  /*
    State
  */
  const [_id] = useState(id || `input-${nanoid()}`)
  const [_selected, setSelected] = useState(selected || null)
  const [_error, setError] = useState(error || null)
  const [open, setOpen] = useState(isOpen || false)
  const [isFocused, setIsFocused] = useState(false)

  // Register locale for the datepicker
  registerLocale('nb', nb)

  /*
    Effects
  */
  // Update the local selected state with anything provided by prop
  useEffect(() => {
    if(selected !== undefined) setSelected(selected)
  }, [selected])

  /*
    Memos
  */
  // Make sure that the selected date is always in the same format because DatePicker will crash if it is a unsupported format
  const safeSelected = useMemo(() => {
    // Input validation
    // if(!_selected) return undefined
    let _safeSelected = undefined

    // Make sure that the date is safe to use
    if(_selected) {
      // Convert to date object
      if(_selected instanceof Date) _safeSelected = _selected
      else if(typeof _selected === 'string') _safeSelected = new Date(_selected)
      else if(typeof _selected === 'number') _safeSelected = new Date(_selected)
      // If _safeSelected is set, return it
      if(_safeSelected) {
        setError(undefined)
        return _safeSelected
      }
    }

    // If _safeSelected is in a valid format, output and error and return undefined
    setError('The provided date is not in a supported format');
    return
  }, [_selected])

  /*
    Functions
  */
  function handleDateChange(e) {
    // Input validation
    if(!e) return
    // Update the local state
    setSelected(e)
    // Close on select if applicable
    if(closeOnSelect) setOpen(false)
    // Run the onChange callback if it is provided
    if(onChange && typeof onChange === 'function') onChange(e)
  }

  const handleFocus = (event) => {
    setIsFocused(true)
    setOpen(true)
    if (onFocus && typeof onFocus === 'function') onFocus(event)
  }

  const handleBlur = (event) => {
    setIsFocused(false)
    setOpen(false)
    if (onBlur && typeof onBlur === 'function') onBlur(event)
  }

  const clear = () => {
    setOpen(false)
    setSelected(undefined)
  }

  return (
    <div className={`input-field ${_error ? 'error' : ''}`}>
      {
        !hidePlaceholder &&
          <div className='input-placeholder'>
            {
            (_selected || alwaysPlaceholder) && placeholder &&
              <label htmlFor={_id} className='placeholder-label'>
                {placeholder}
              </label>
            }
          </div>
      }
      <div className={`input-container ${required ? 'required-input' : ''} ${_error ? 'error' : ''}`}>
        <DatePicker
          id={_id}
          open={false}
          selected={safeSelected}
          disabled={disabled || false}
          placeholderText={placeholder || ''}
          popperPlacement={placement}
          locale='nb'
          dateFormat='dd.MM.yyyy'
          aria-invalid={!!error}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => handleDateChange(e)}
          onClickOutside={() => setOpen(false)}
          {...props}
        />
        <div className='input-icon-group'>
          { showClear && <Icon name="close" onClick={clear}/> }
          <div className={`icon ${disabled ? 'icon-disabled' : ''}`} onClick={() => setOpen(!open)} disabled={disabled || false}>
            <IconCalendar alt='' disabled={disabled || false} />
          </div>
        </div>
      </div>
      {
        !hideDetails &&
          <div className='input-details'>
            {
            _error &&
              <p role='alert' aria-live='assertive' className='details-text error'>
                {_error.message || _error}
              </p>
            }
            {
            (!error && (isFocused || alwaysHint)) &&
              <p aria-live='assertive' className='details-text'>
                {hint}
              </p>
          }
          </div>
      }
    </div>
  )
}

Datepicker.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  placement: PropTypes.oneOf([
    'auto',
    'auto-end',
    'auto-start',
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start'
  ]),
  required: PropTypes.bool,
  selected: PropTypes.instanceOf(Date)
}

Datepicker.defaultProps = {
  placement: 'bottom-start'
}
