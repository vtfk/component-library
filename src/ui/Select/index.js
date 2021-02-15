import React, { createRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import { Icon } from '../Icon'
import { RadioButton } from '../RadioButton'
import { Checkbox } from '../Checkbox'

import './Select.scss'

const SelectDropdown = ({ placeholder, label, id, selectedItem, open, setOpen, error, className, children, ...props }) => {
  const [labelId] = useState(id || `id${nanoid()}`)
  const buttonRef = createRef()
  const openedRef = createRef(false)

  useEffect(() => {
    if (open) openedRef.current = true
    if (!open && openedRef.current && buttonRef.current) buttonRef.current.focus()
  }, [open])

  const hasSelected = selectedItem && Array.isArray(selectedItem) ? selectedItem && selectedItem.length > 0 : !!selectedItem

  return (
    <div className={`select select-single ${open ? 'is-open' : 'is-closed'} ${hasSelected ? 'has-selected' : 'not-selected'} ${error ? 'error' : ''} ${className || ''}`} data-testid='container' {...props}>
      <label htmlFor={labelId} title={label || placeholder} className='label'>
        {label || placeholder}
      </label>
      <button id={labelId} onClick={() => { setOpen(!open) }} aria-haspopup='listbox' aria-expanded={open} aria-controls={`${labelId}-container`} ref={buttonRef}>
        <div>
          {
            open || !hasSelected
              ? placeholder
              : Array.isArray(selectedItem)
                ? selectedItem.map((item, i) => (<div key={i}>{item.label || item}</div>))
                : (selectedItem.label || selectedItem)
          }
        </div>
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size='auto' alt='' />
      </button>
      <fieldset id={`${labelId}-container`}>
        {children}
      </fieldset>

      {
        error &&
          <label htmlFor={labelId} role='alert' aria-live='assertive' className='error-message'>
            {error}
          </label>
      }
    </div>
  )
}

export const Select = ({ placeholder, label, items, selectedItem, id, onChange, isOpen, closeOnSelect, ...props }) => {
  const [open, setOpen] = useState(isOpen || false)
  const buttonRef = createRef()

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
    <SelectDropdown
      id={id}
      placeholder={placeholder}
      label={label}
      open={open}
      setOpen={setOpen}
      selectedItem={selectedItem}
      {...props}
    >
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
    </SelectDropdown>
  )
}

export const SelectMultiple = ({ placeholder, label, items, selectedItems, isOpen, id, onChange, ...props }) => {
  const [open, setOpen] = useState(isOpen || false)

  function isSelected (item) {
    return selectedItems && selectedItems.filter(function (e) { return e.value === item.value }).length > 0
  }

  const handleKeyPress = (event, item) => {
    if (event.key === 'Enter') {
      if (!selectedItems || selectedItems.length === 0) onChange(item)
      setOpen(false)
    }
  }

  return (
    <SelectDropdown
      id={id}
      placeholder={placeholder}
      label={label}
      open={open}
      setOpen={setOpen}
      selectedItem={selectedItems}
      {...props}
    >
      {
        items.map(function (item, index) {
          return (
            <div className='select2-item' key={index}>
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
    </SelectDropdown>
  )
}

SelectDropdown.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  open: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setOpen: PropTypes.func.isRequired
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
  label: PropTypes.string,
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
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  selectedItems: PropTypes.array
}
