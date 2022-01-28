import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import DatePicker, { registerLocale } from 'react-datepicker'
import nb from 'date-fns/locale/nb'

import { ReactComponent as IconCalendar } from './icon-calendar.svg'

import './styles.scss'

export function Datepicker ({ placeholder, label, selected, id, isOpen, disabled, required, error, placement, ...props }) {
  const [open, setOpen] = useState(isOpen || false)
  const [labelId] = useState(id || `id${nanoid()}`)
  registerLocale('nb', nb)

  return (
    <div className={`datepicker-field ${error ? 'error' : ''}`}>
      {
        selected &&
          <label htmlFor={labelId} className='placeholder-label'>
            {label || placeholder}
          </label>
      }
      <div className={`'picker' ${required ? 'required-input' : ''}`}>
        <DatePicker
          disabled={disabled || false}
          id={labelId}
          placeholderText={placeholder || ''}
          selected={selected}
          locale='nb'
          dateFormat='dd.MM.yyyy'
          aria-invalid={!!error}
          onFocus={() => setOpen(true)}
          onClickOutside={() => setOpen(false)}
          open={open}
          popperPlacement={placement}
          {...props}
        />

        <div className={`icon ${disabled ? 'icon-disabled' : ''}`} onClick={() => setOpen(!open)} disabled={disabled || false}>
          <IconCalendar alt='' disabled={disabled || false} />
        </div>
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
