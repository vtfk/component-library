import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import DatePicker, { registerLocale } from 'react-datepicker'
import nb from 'date-fns/locale/nb'

import { Icon } from '../Icon'

import './styles.scss'

export function Datepicker ({ id, selected, isOpen, placeholder, hidePlaceholder, alwaysPlaceholder, hint, alwaysHint, hideDetails, showClear, closeOnSelect, disabled, required, error, placement, onChange, onFocus, onBlur, ...props }) {
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
    if (selected !== undefined) setSelected(selected)
    if (isOpen !== undefined) setOpen(isOpen)
    if (error !== undefined) setError(error)
  }, [selected, isOpen])

  /*
    Memos
  */
  // Make sure that the selected date is always in the same format because DatePicker will crash if it is a unsupported format
  const safeSelected = useMemo(() => {
    // Input validation
    if (!_selected) return undefined
    let _safeSelected

    // Make sure that the date is safe to use
    try {
      if (_selected instanceof Date) _safeSelected = _selected
      else if (typeof _selected === 'string') _safeSelected = new Date(_selected)
      else if (typeof _selected === 'number') _safeSelected = new Date(_selected)
      // If _safeSelected is set, return it
      setError(undefined)
      return _safeSelected
    } catch (err) {
      // If the date is not a valid format
      setError(err)
    }
  }, [_selected])

  // Determines the classes of the main input-field component
  const inputfieldClasses = useMemo(() => {
    const _classes = ['input-field']

    if (_error) _classes.push('error')
    if (disabled) _classes.push('disabled')
    if (required) _classes.push('required')

    return _classes.join(' ')
  }, [_error, disabled])

  // Determines if and what should be shown in the placeholder-field
  const placeholderComponent = useMemo(() => {
    if (hidePlaceholder) return <></>
    if ((_selected || alwaysPlaceholder) && placeholder) {
      return (
        <div className='input-placeholder'>
          <label htmlFor={_id} className='placeholder-label'>
            {placeholder}
          </label>
        </div>
      )
    }
    return <></>
  }, [_selected, alwaysPlaceholder, placeholder, hidePlaceholder])

  // Dermines if and what should be shown in the details-field
  const detailsComponent = useMemo(() => {
    if (hideDetails) return <></>
    if (_error) {
      return (
        <div className='input-details'>
          <p role='alert' aria-live='assertive' className='details-text error'>
            {_error.message || _error}
          </p>
        </div>
      )
    } else if (isFocused || alwaysHint) {
      return (
        <div className='input-details'>
          <p aria-live='assertive' className='details-text'>
            {hint}
          </p>
        </div>
      )
    }
    return <></>
  })

  /*
    Functions
  */
  // Handles the onChange event of the component
  function handleOnChange (e) {
    // Input validation
    if (!e) return
    // Update the local state
    setSelected(e)
    // Close on select if applicable
    if (closeOnSelect) setOpen(false)
    // Run the onChange callback if it is provided
    if (onChange && typeof onChange === 'function') onChange(e)
  }

  // Handles the onFocus event of the component
  const handleFocus = (event) => {
    setIsFocused(true)
    setOpen(true)
    if (onFocus && typeof onFocus === 'function') onFocus(event)
  }

  // Handles the onBlur event of the component
  const handleBlur = (event) => {
    setIsFocused(false)
    setOpen(false)
    if (onBlur && typeof onBlur === 'function') onBlur(event)
  }

  // Handles clearing the components data
  const clear = () => {
    setOpen(false)
    setSelected(undefined)
    if (required) setError('Dette feltet er påkrevd')
  }

  /*
    JSX
  */
  return (
    <div className={inputfieldClasses}>
      {placeholderComponent}
      <div className='input-container'>
        <DatePicker
          id={_id}
          open={open}
          selected={safeSelected}
          disabled={disabled || false}
          placeholderText={placeholder || ''}
          popperPlacement={placement}
          locale='nb'
          dateFormat='dd.MM.yyyy'
          aria-invalid={!!_error}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e)}
          onChange={(e) => handleOnChange(e)}
          onClickOutside={() => setOpen(false)}
          {...props}
        />
        <div className='input-icon-group'>
          {showClear && <Icon name='close' disabled={disabled} onClick={clear} />}
          <Icon name='calendar' disabled={disabled} onClick={() => setOpen(!open)} />
        </div>
      </div>
      {detailsComponent}
    </div>
  )
}

/*
  Prop types
*/
Datepicker.propTypes = {
  alwaysHint: PropTypes.bool,
  alwaysPlaceholder: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hideDetails: PropTypes.bool,
  hidePlaceholder: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
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
  selected: PropTypes.oneOf([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
  showClear: PropTypes.bool
}

/*
  Default values
*/
Datepicker.defaultProps = {
  alwaysHint: false,
  alwaysPlaceholder: false,
  closeOnSelect: false,
  disabled: false,
  hideDetails: false,
  placement: 'bottom-start',
  showClear: true
}
