import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid/non-secure'

import { Icon } from '../Icon'
import { RadioButton } from '../RadioButton'
import { Checkbox } from '../Checkbox'

import './Select.scss'

const SelectDropdown = ({ placeholder, label, disabled, required, id, selectedItem, open, setOpen, error, multiselect, className, children, ...props }) => {
  const [labelId] = useState(id || `id${nanoid()}`)
  const fieldsetRef = useRef()
  const buttonRef = useRef()
  const openedRef = useRef(false)
  const initiallyOpenedRef = useRef(open || false)

  useEffect(() => {
    if (open) {
      // Focus first input element in fieldset on opening, but not on first open when select was initially open
      if (fieldsetRef.current && (!initiallyOpenedRef.current || openedRef.current)) fieldsetRef.current.querySelector('input').focus()

      // Register the dropdown as opened, so we can focus the button on actuall close
      openedRef.current = true
    }

    if (!open && openedRef.current && buttonRef.current) buttonRef.current.focus()
  }, [open])

  const handleKeydown = event => {
    if (event.key === 'Escape') setOpen(false)
  }

  const hasSelected = selectedItem && Array.isArray(selectedItem) ? selectedItem && selectedItem.length > 0 : !!selectedItem
  const selectedLabel = hasSelected ? (Array.isArray(selectedItem) ? selectedItem.map(item => item.label || item).join(', ') : selectedItem.label || selectedItem) : ''

  return (
    <div className={`select select-single ${open ? 'is-open' : 'is-closed'} ${hasSelected ? 'has-selected' : 'not-selected'} ${error ? 'error' : ''} ${className || ''} ${required ? 'required-input' : ''}`} data-testid='container' onKeyDown={handleKeydown} {...props}>
      <label htmlFor={labelId} title={label || placeholder} className='label'>
        {label || placeholder}
      </label>
      <button
        disabled={disabled || false}
        id={labelId}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-controls={`${labelId}-container`}
        aria-label={`${hasSelected && !open ? `${(label || placeholder)}: ${selectedLabel}` : placeholder}`}
        onClick={() => { setOpen(!open) }}
        ref={buttonRef}
      >
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
      <fieldset id={`${labelId}-container`} role='listbox' aria-multiselectable={!!multiselect} ref={fieldsetRef}>
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

  const handleMouseUp = (item) => {
    onChange(item)
    if (closeOnSelect) setOpen(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') setOpen(false)
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
        items.map((item, index) => {
          const checked = selectedItem && selectedItem.value === item.value
          return (
            <RadioButton
              key={index}
              onChange={() => onChange(item)}
              onMouseUp={() => handleMouseUp(item)}
              onKeyPress={handleKeyPress}
              name={`select-${nanoid()}`}
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
      multiselect
      {...props}
    >
      {
        items.map((item, index) => (
          <Checkbox
            key={index}
            onChange={() => { onChange(item) }}
            onKeyPress={(e) => handleKeyPress(e, item)}
            name={`select-multiple-${nanoid()}`}
            value={item.value}
            label={item.label}
            checked={isSelected(item)}
            aria-selected={isSelected(item)}
          />
        ))
      }
    </SelectDropdown>
  )
}

SelectDropdown.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  multiselect: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
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
