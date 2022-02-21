import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useDebouncedCallback } from 'use-debounce'

import './styles.scss'

import { TextField } from '../TextField'
import { Icon } from '../Icon'
import { Paragraph } from '../Typography'

export function SearchField ({ placeholder, value, debounceMs, onSelected, rounded, onSearch, onChange, className, items, loading, loadingText, emptyText, onItemClick, onKeyDown, onBlur, onFocus, children, ...props }) {
  const [searchValue, setSearchValue] = useState(value || '')
  const [searchInputFocused, setSearchInputFocused] = useState(false)
  const [searchInputSelectedIndex, setSearchInputSelectedIndex] = useState(0)
  const debouncer = useDebouncedCallback(event => {
    if ((items || children) && onSearch && typeof onSearch === 'function') onSearch(event)
  }, debounceMs)

  useEffect(() => {
    if (items && typeof loading === 'boolean' && loading) setSearchInputSelectedIndex(0)
  }, [loading])

  const handleKeyDown = (event) => {
    if (onKeyDown && typeof onKeyDown === 'function') onKeyDown(event)

    if (event.key !== 'Enter') setSearchInputFocused(true)

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (items && items.length > 0 && searchInputSelectedIndex > 0) setSearchInputSelectedIndex(searchInputSelectedIndex - 1)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (items && (items.length - 1) > searchInputSelectedIndex) setSearchInputSelectedIndex(searchInputSelectedIndex + 1)
    } else if (event.key === 'Enter') {
      event.preventDefault()

      if (searchInputFocused) selected()
      if (items || children) setSearchInputFocused(false)
    }
  }

  const handleBlur = () => {
    if (onBlur && typeof onBlur === 'function') onBlur()
    setSearchInputFocused(false)
  }

  const handleFocus = () => {
    if (onFocus && typeof onFocus === 'function') onFocus()
    setSearchInputFocused(true)
  }

  const handleChange = (event) => {
    setSearchValue(event.target.value)
    debouncer(event)
    if (onChange && typeof onChange === 'function') onChange(event)
  }

  const handleItemClick = (item, index) => {
    if (onItemClick && typeof onItemClick === 'function') onItemClick(item)
    setSearchInputSelectedIndex(index)
  }

  const selected = () => {
    if (!items && !children && onSearch && typeof onSearch === 'function') onSearch(searchValue)
    if (items && onSelected && typeof onSelected === 'function') onSelected(items.length > 0 ? items[searchInputSelectedIndex] : searchValue)
    if (children && onSelected && typeof onSelected === 'function') onSelected(searchValue)
  }

  return (
    <div className='header-search'>
      <div className={`search-field ${rounded ? 'rounded' : ''}`}>
        <TextField
          value={searchValue}
          className={`${className || ''}`}
          rounded={rounded}
          placeholder={placeholder || 'Søk...'}
          label={rounded ? null : placeholder}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={
            (items || children) && searchInputFocused && searchValue !== ''
              ? { boxShadow: 'none', paddingRight: 200, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: '#979797', borderBottomWidth: 0 }
              : { boxShadow: 'none', paddingRight: 200, borderColor: '#979797' }
          }
          {...props}
        />

        <div className='icon' onClick={selected}>
          <Icon name='search' alt='' />
        </div>
      </div>
      {
        items && !children && searchInputFocused && searchValue !== '' &&
          <div className='search-result'>
            <div className='search-results-inner'>
              {
                !loading &&
                items &&
                items.length > 0 &&
                items.map((item, index) => {
                  return (
                    <div onMouseDown={() => { handleItemClick(item, index) }} key={index} className={`search-results-item ${index === searchInputSelectedIndex ? 'active' : ''}`}>
                      {
                        item.itemTitle &&
                          <Paragraph className='search-results-item-width'>{item.itemTitle}</Paragraph>
                      }
                      {
                        item.itemSecondary &&
                          <Paragraph className='search-results-item-width' size='small'>{item.itemSecondary}</Paragraph>
                      }
                      {
                        item.itemDescription &&
                          <Paragraph className='search-results-item-width' size='small'>{item.itemDescription}</Paragraph>
                      }
                    </div>
                  )
                })
              }

              {
                !loading &&
                items &&
                items.length === 0 &&
                  <div className='search-results-item-message search-alternatives'>
                    <Paragraph>
                      {emptyText}
                    </Paragraph>
                  </div>
              }

              {
                loading &&
                  <div className='search-results-item-message search-alternatives'>
                    <Paragraph>
                      {loadingText}
                    </Paragraph>
                  </div>
              }
            </div>
          </div>
      }

      {
        !items && children && searchInputFocused && searchValue !== '' &&
          <div className='search-result'>
            <div className='search-results-inner'>
              {children}
            </div>
          </div>
      }
    </div>
  )
}

SearchField.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  debounceMs: PropTypes.number,
  emptyText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  items: PropTypes.arrayOf(PropTypes.shape({
    itemTitle: PropTypes.string,
    itemSecondary: PropTypes.string,
    itemDescription: PropTypes.string
  })),
  loading: PropTypes.bool,
  loadingText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onItemClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSearch: PropTypes.func,
  onSelected: PropTypes.func,
  placeholder: PropTypes.string,
  rounded: PropTypes.bool,
  value: PropTypes.string
}

SearchField.defaultProps = {
  debounceMs: 0,
  emptyText: 'Søket gav ingen resultater...',
  loadingText: 'Søker...'
}
