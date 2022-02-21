import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { useDebouncedCallback } from 'use-debounce'

import './styles.scss'

import { TextField } from '../TextField'
import { Icon } from '../Icon'
import { Paragraph } from '../Typography'
import { nanoid } from 'nanoid'

export function SearchField ({ placeholder, value, debounceMs, onSelected, rounded, onSearch, onChange, className, items, itemMapping, loading, loadingText, emptyText, onItemClick, onKeyDown, children, onBlur, onFocus, ...props }) {
  const [searchValue, setSearchValue] = useState(value || '')
  // const [searchInputFocused, setSearchInputFocused] = useState(false)
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const [isShowDropdown, setIsShowDropdown] = useState(false)

  // Setup item mapping
  const [_itemMapping] = useMemo(() => {
    if (itemMapping && Array.isArray(itemMapping)) return [itemMapping]
    if (!items || !Array.isArray(items) || items.length === 0) return []

    const mappings = []

    if (items[0].name) {
      mappings.push({ value: 'name' })
    } else if (items[0].title) {
      mappings.push({ value: 'title' })
    } else if (items[0].displayName) {
      mappings.push({ value: 'displayName' })
    }

    if (mappings.length > 0) {
      mappings[0].style = { textTransform: 'capitalize' }
    }

    return [mappings]
  }, [items, itemMapping])

  // const [validChildren] = useMemo(() => {
  //   if (!children) return undefined
  //   if (!Array.isArray(children) && typeof children === 'object') return children
  //   if (!Array.isArray(children)) return undefined

  //   const vc = children.filter((c) => typeof c === 'object')

  //   if (vc.length !== 0) return [vc]

  //   return undefined
  // }, [children])

  const debouncer = useDebouncedCallback(event => {
    if (onSearch && typeof onSearch === 'function') onSearch(event)
  }, debounceMs)

  useEffect(() => {
    function handleMouseUp (e) {
      if (!e || !e.path) return

      // Retreive a list of all classes under the clicked coordinate
      // If the click is outside the searchfield or dropdown, hide it
      const classList = e.path.map((p) => { return p.className })
      if (!classList.includes('search-result-table') && !classList.includes('header-search')) setIsShowDropdown(false)
    }

    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [loading])

  const handleKeyDown = (event) => {
    if (onKeyDown && typeof onKeyDown === 'function') onKeyDown(event)

    // if (event.key !== 'Enter') {
    //   setSearchInputFocused(true)
    // }

    if (event.key === 'ArrowUp') {
      if (items && items.length > 0) {
        if (!isShowDropdown) setIsShowDropdown(true)
        else if (focusedItemIndex > 0) setFocusedItemIndex(focusedItemIndex - 1)
      }
      event.preventDefault()
    } else if (event.key === 'ArrowDown') {
      if (items && items.length > 0) {
        if (!isShowDropdown) setIsShowDropdown(true)
        else if ((items.length - 1) > focusedItemIndex) setFocusedItemIndex(focusedItemIndex + 1)
      }
      event.preventDefault()
    } else if (event.key === 'Enter') {
      if (items && items.length > 0 && isShowDropdown) {
        handleItemClick(items[focusedItemIndex], focusedItemIndex)
      }
    }
  }

  const handleBlur = () => {
    if (onBlur && typeof onBlur === 'function') onBlur()
    // setSearchInputFocused(false)
  }

  const handleFocus = () => {
    if (onFocus && typeof onFocus === 'function') onFocus()
    // setSearchInputFocused(true)
    if (items && Array.isArray(items) && items.length > 0) setIsShowDropdown(true)
  }

  const handleChange = (event) => {
    setSearchValue(event.target.value)
    debouncer(event)
    if (onChange && typeof onChange === 'function') onChange(event)
    setIsShowDropdown(true)
  }

  const handleSearch = () => {
    if (!items && !children && onSearch && typeof onSearch === 'function') onSearch(searchValue)
    setIsShowDropdown(true)
  }

  const handleItemClick = (item, index) => {
    if (onSelected && typeof onSelected === 'function') onSelected(item, index)
    if (onItemClick && typeof onItemClick === 'function') onItemClick(item, index)

    if (_itemMapping && Array.isArray(_itemMapping) && _itemMapping[0].value) {
      const val = item[_itemMapping[0].value]
      setSearchValue(val)
    }
    setIsShowDropdown(false)
    handleBlur()
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
          // onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={
            isShowDropdown
              ? { boxShadow: 'none', paddingRight: 200, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: '#979797', borderBottomWidth: 0 }
              : { boxShadow: 'none', paddingRight: 200, borderColor: '#979797' }
          }
          {...props}
        />
        <div className='icon' onClick={handleSearch}>
          <Icon name='search' alt='' />
        </div>
      </div>
      {
        /* Dropdown */
        isShowDropdown &&
          <div className='search-result'>
            <div className='search-results-inner'>
              {
              /* Render loading */
              loading &&
                <div className='search-results-item-message search-alternatives'>
                  <Paragraph>
                    {loadingText}
                  </Paragraph>
                </div>
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
              /* Render items */
              !loading &&
              items &&
              items.length > 0 &&
                <table className='search-result-table'>
                  <tbody>
                    {
                  items.map((item, index) => {
                    return (
                      <tr key={nanoid()} className={`search-result-table-row ${index === focusedItemIndex ? 'active' : ''}`} onClick={() => handleItemClick(item, index)}>
                        {
                          Array.isArray(_itemMapping) && _itemMapping.map((mapping) => {
                            return (
                              <td key={nanoid()} style={mapping.style}>{item[mapping.value]}</td>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
                  </tbody>
                </table>
            }
              {
              /* Render children */
              children && { children }
            }
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
  itemMapping: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
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
