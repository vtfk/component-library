import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import { Icon } from '../Icon'
import { RadioButton } from '../RadioButton'
import { Checkbox } from '../Checkbox'
import { ErrorMessage } from '../Typography'

// import './styles.scss'
import './styles2.scss'

export function Select ({ placeholder, label, items, selectedItem, id, onChange, isOpen, closeOnSelect, error, ...props }) {
  const [open, setOpen] = useState(isOpen || false)
  const [labelId] = useState(id || `id${nanoid()}`)

  function toggleSelect () {
    setOpen(prevSelectState => !prevSelectState)
  }

  const handleMouseUp = (item) => {
    onChange(item)
    if (closeOnSelect) setOpen(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && closeOnSelect) setOpen(false)
  }

  return (
    <div className={`select select-single ${open === true ? 'is-open' : ''} ${error ? 'error' : ''}`}>
      <div {...props}>
        {
          placeholder &&
          selectedItem &&
            <div>
              <label htmlFor={labelId} className='select-label'>
                {placeholder}
              </label>
              <button className='select-trigger' id={labelId} onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
                <div className='select-trigger-text selected'>
                  <div>{open === true ? placeholder : selectedItem.label}</div>
                </div>
                <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
              </button>
            </div>
        }

        {
          placeholder &&
          !selectedItem &&
            <button className='select-trigger' id={labelId} onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
              <label htmlFor={labelId} className='select-trigger-text'>
                {placeholder}
              </label>
              <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
            </button>
        }

        {
          open === true &&
            <fieldset className='select-items' role='listbox' id={labelId}>
              {
                items.map(function (item, index) {
                  const checked = selectedItem && selectedItem.value === item.value
                  return (
                    <div className='select-item' key={index}>
                      <RadioButton
                        onChange={() => onChange(item)}
                        onMouseUp={() => handleMouseUp(item)}
                        onKeyPress={handleKeyPress}
                        name={`select-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
                        value={item.value}
                        label={item.label}
                        checked={checked}
                        aria-selected={checked}
                        role='option'
                      />
                    </div>
                  )
                })
              }
              {
                error &&
                  <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
                    {error.message || error}
                  </label>
              }
            </fieldset>
        }

        {
          error && open === false &&
            <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
              {error.message || error}
            </label>
        }
      </div>
    </div>
  )
}

export function SelectMultiple ({ placeholder, label, items, selectedItems, isOpen, id, onChange, error, ...props }) {
  const [open, setOpen] = useState(isOpen || false)
  const [labelId] = useState(id || nanoid())

  function toggleSelect () {
    setOpen(prevSelectState => !prevSelectState)
  }

  function isSelected (item) {
    console.log('selectedItems', selectedItems)
    return selectedItems.filter(function (e) { return e.value === item.value }).length > 0
  }

  const handleKeyPress = (event, item) => {
    if (event.key === 'Enter') {
      if (selectedItems.length === 0) onChange(item)
      setOpen(false)
    }
  }

  return (
    <div className={`select select-multiple ${open === true ? 'is-open' : ''} ${error ? 'error' : ''}`}>
      <div {...props}>
        {
          placeholder &&
          selectedItems.length > 0 &&
            <div>
              <label htmlFor={labelId} className='select-label'>
                {placeholder}
              </label>
              <button id={labelId} className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
                <div className='select-trigger-text selected'>
                  {
                    open === true
                      ? placeholder
                      : selectedItems.map(function (item, index) {
                        return (
                          <div key={item.value}>{item.label}</div>
                        )
                      })
                  }
                </div>
                <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
              </button>
            </div>
        }
        {
          placeholder &&
          (!selectedItems || selectedItems.length === 0) &&
            <button id={labelId} className='select-trigger' onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open}>
              <label htmlFor={labelId} className='select-trigger-text'>
                {placeholder}
              </label>
              <Icon className='select-trigger-icon' name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
            </button>
        }

        {
          open === true &&
            <fieldset id={labelId} className='select-items' role='listbox'>
              {
                items.map(function (item, index) {
                  return (
                    <div className='select-item' key={index}>
                      <Checkbox
                        onChange={() => { onChange(item) }}
                        onKeyPress={(e) => handleKeyPress(e, item)}
                        name={`select-multiple-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
                        value={item.value}
                        label={item.label}
                        checked={isSelected(item)}
                        aria-selected={isSelected(item)}
                        role='option'
                      />
                    </div>
                  )
                })
              }
              {
                error &&
                  <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
                    {error.message || error}
                  </label>
              }
            </fieldset>
        }
        {
          error && open === false &&
            <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
              {error.message || error}
            </label>
        }
      </div>
    </div>
  )
}

export function NewSelect ({ placeholder, label, items, selectedItem, id, onChange, isOpen, closeOnSelect, error, className, ...props }) {
  const [open, setOpen] = useState(isOpen || false)
  const [labelId] = useState(id || `id${nanoid()}`)
  const buttonRef = createRef()

  function toggleSelect () {
    setOpen(prevSelectState => !prevSelectState)
  }

  const handleMouseUp = (item) => {
    onChange(item)
    if (closeOnSelect) closeSelect()
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') closeSelect()
  }

  const closeSelect = () => {
    setOpen(false)
    if (buttonRef.current) buttonRef.current.focus()
  }

  return (
    <div className={`select select-single ${open ? 'is-open' : 'is-closed'} ${selectedItem ? 'has-selected' : 'not-selected'} ${error ? 'error' : ''} ${className || ''}`} {...props}>
      <label htmlFor={labelId} title={placeholder}>
        {placeholder}
      </label>
      <button id={labelId} onClick={() => { toggleSelect() }} aria-haspopup='listbox' aria-expanded={open} aria-controls={`${labelId}-container`} ref={buttonRef}>
        <div>{open || !selectedItem ? placeholder : selectedItem.label}</div>
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
      </button>
      <fieldset id={`${labelId}-container`}>
        {
          items.map(function (item, index) {
            const checked = selectedItem && selectedItem.value === item.value
            return (
              <RadioButton
                key={index}
                onChange={() => onChange(item)}
                onMouseUp={() => handleMouseUp(item)}
                onKeyPress={handleKeyPress}
                name={`select-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
                value={item.value}
                label={item.label}
                checked={checked}
                aria-selected={checked}
              />
            )
          })
        }
      </fieldset>

      {
        error &&
          <ErrorMessage htmlFor={labelId}>
            {error.message || error}
          </ErrorMessage>
      }
    </div>
  )
}

Select.propTypes = {
  closeOnSelect: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.object
}

SelectMultiple.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  selectedItems: PropTypes.array
}
