import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import DatePicker, { registerLocale } from 'react-datepicker'
import nb from 'date-fns/locale/nb'

import { ReactComponent as IconCalendar } from './icon-calendar.svg'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.scss'

export function Datepicker ({ placeholder, label, selected, id, isOpen, error, ...props }) {
  const [open, setOpen] = useState(isOpen || false)
  const [labelId] = useState(id || nanoid())
  registerLocale('nb', nb)

  return (
    <div className={`datepicker-field ${error ? 'error' : ''}`}>
      {
        selected &&
          <label htmlFor={labelId} className='placeholder-label'>
            {label || placeholder}
          </label>
      }
      <div className='picker'>
        <DatePicker
          id={labelId}
          placeholderText={placeholder || ''}
          selected={selected}
          locale='nb'
          dateFormat='dd.MM.yyyy'
          aria-invalid={!!error}
          onFocus={() => setOpen(true)}
          onClickOutside={() => setOpen(false)}
          open={open}
          {...props}
        />

        <div className='icon' onClick={() => setOpen(!open)}>
          <IconCalendar alt='' />
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
  error: PropTypes.string,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date).isRequired
}
