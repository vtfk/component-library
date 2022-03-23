import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import { useDebouncedCallback } from 'use-debounce'

import './styles.scss'

import { Icon } from '../Icon'
import { Paragraph } from '../Typography'
import { nanoid } from 'nanoid'

export function SearchField ({ placeholder, value, debounceMs, onSelected, rounded, onSearch, onChange, className, items, itemMapping, showDropdown, showClear, showSearch, onShowDropdown, onClickOutside, loading, loadingText, emptyText, onKeyDown, children, onBlur, onFocus, ...props }) {
  /*
    State
  */
  const [componentId] = useState(nanoid())
  const [searchValue, setSearchValue] = useState(value || '')
  const [focusedItemIndex, setFocusedItemIndex] = useState(0)
  const [isShowDropdown, setIsShowDropdown] = useState(showDropdown || false)

  /*
    Memos
  */
  // Setup item mapping
  const [_itemMapping] = useMemo(() => {
    if (itemMapping && Array.isArray(itemMapping)) return [itemMapping]
    if (!items || !Array.isArray(items) || items.length === 0) return []

    const mappings = [
      { value: 'itemTitle' },
      { value: 'itemSecondary' },
      { value: 'itemDescription' }
    ]

    return [mappings]
  }, [items, itemMapping])

  const searchFieldStyle = useMemo(() => {
    let _style = {}
    if (isShowDropdown) _style = { ..._style, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
    return _style
  }, [isShowDropdown])

  /*
    Handle eventlisteners and externally updated state
  */
  useEffect(() => {
    // Update state
    let val = '' // Default as empty
    if (value !== undefined) val = value // If value has been provided, use that
    else if (searchValue !== undefined) val = searchValue // If not, check if it already has state
    setSearchValue(val)

    // Update if the dropdown should be shown or not
    let shouldShowDropdown = isShowDropdown
    if (showDropdown !== undefined) shouldShowDropdown = showDropdown
    setIsShowDropdown(shouldShowDropdown)

    // Setup events
    function handleMouseUp (e) {
      if (!e || !e.target) return

      // Retreive a list of all classes under the clicked coordinate
      // If the click is outside the searchfield or dropdown, hide it
      let parentNode = e.target
      let shouldClose = true
      do {
        if (typeof parentNode.id === 'string' && parentNode.id === componentId) {
          shouldClose = false
          break
        }
        parentNode = parentNode.parentNode
      } while (parentNode !== null)
      if (shouldClose) {
        handleShowDropdown(false)
        if (onClickOutside && typeof onClickOutside === 'function') onClickOutside(e)
      }
    }
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [loading, value, showDropdown])

  // Resetting timer that awaits firing the onSearch callback until debounceMs has been reached
  const debouncer = useDebouncedCallback(event => {
    // Run the onSearch callback
    handleSearch(event)
  }, debounceMs)

  // Handles searching
  const handleSearch = (event) => {
    // Run the onSearch callback
    setFocusedItemIndex(0)
    if (!event) event = { target: { value: searchValue } }
    if (onSearch && typeof onSearch === 'function') onSearch(event)
  }

  // Handles keydown event for the SearchField component
  const handleKeyDown = (event) => {
    if (onKeyDown && typeof onKeyDown === 'function') onKeyDown(event)

    if (isShowDropdown && event.key === 'Escape') {
      handleShowDropdown(false)
      return
    }

    // Handle navigation in the resultItems
    if (items && items.length > 0) {
      if (event.key === 'ArrowUp') {
        if (!isShowDropdown) handleShowDropdown(true)
        else if (focusedItemIndex > 0) setFocusedItemIndex(focusedItemIndex - 1)
        event.preventDefault()
      }
      if (event.key === 'ArrowDown') {
        if (!isShowDropdown) handleShowDropdown(true)
        else if (focusedItemIndex < items.length - 1) setFocusedItemIndex(focusedItemIndex + 1)
        event.preventDefault()
      } else if (event.key === 'Enter' && isShowDropdown) {
        handleItemClick(items[focusedItemIndex], focusedItemIndex)
        event.preventDefault()
      }
    } else if (children) {
      if (event.key === 'Enter' && isShowDropdown) {
        if (onSelected && typeof onSelected === 'function') onSelected()
        handleShowDropdown(false)
        event.preventDefault()
      }
    } else {
      // Start a search
      if (event.key === 'Enter') {
        handleSearch(event)
      }
    }
  }

  // Triggers when the searchFields is focused
  const handleFocus = (event) => {
    if (onFocus && typeof onFocus === 'function') onFocus(event)
    if ((items && Array.isArray(items) && items.length > 0) || children) handleShowDropdown(true)
  }

  // Handle when the searchField value changes
  const handleChange = (event) => {
    // Update the search value
    setSearchValue(event.target.value || '')

    // Fire the onChange callback
    if (onChange && typeof onChange === 'function') onChange(event)

    // Handle what will happen if the searchField input is empty or not
    if (items || children) {
      if (event.target.value !== '') {
        if (debounceMs > 0) debouncer(event)
        else handleSearch(event)
        handleShowDropdown(true)
      } else {
        handleSearch(event)
        handleShowDropdown(false)
      }
    } else {
      if (debounceMs > 0) debouncer(event)
    }
  }

  // Handles clicking the searchButton
  const handleSearchBtnClick = () => {
    handleSearch()
    handleShowDropdown(true)
  }

  // Handle when the cleanButton is clicked
  const handleClear = () => {
    handleChange({ target: { value: '' } })
    handleItemClick(undefined, null)
  }

  // Handles clicking the searchResult items
  const handleItemClick = (item, index) => {
    if (onSelected && typeof onSelected === 'function') onSelected(item, index)

    // Set the index of the selected item
    if (index !== undefined && index >= 0 && index < items.length) setFocusedItemIndex(index)

    // Retreive primary value and set it as the searchValue
    if (_itemMapping && Array.isArray(_itemMapping) && _itemMapping[0].value) {
      const val = item[_itemMapping[0].value]
      setSearchValue(val)
    }
    handleShowDropdown(false)
  }

  const handleBlur = (event) => {
    if (onBlur && typeof onBlur === 'function') onBlur(event)
  }

  const handleShowDropdown = (boolean) => {
    setIsShowDropdown(boolean)
    if (onShowDropdown && typeof onShowDropdown === 'function') onShowDropdown(boolean)
  }

  return (
    <div id={componentId} className={`search-field ${rounded ? 'rounded' : ''}`} style={searchFieldStyle} {...props}>
      <input
        value={searchValue}
        placeholder={placeholder || 'Søk...'}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <div className='icon-group'>
        {
            showClear &&
              <div className='icon' onClick={handleClear}>
                <Icon name='close' alt='' />
              </div>
          }
        {
            showSearch &&
              <div className='icon search-icon' onClick={handleSearchBtnClick}>
                <Icon name='search' alt='' />
              </div>
          }
      </div>
      {
        /* Dropdown */
        isShowDropdown && searchValue !== '' && (loading || items || children) &&
          <div className='search-result'>
            <div className='search-results-inner'>
              {
              /* Render loading */
              loading && !children &&
                <div className='search-results-item-message search-alternatives'>
                  <Paragraph>
                    {loadingText}
                  </Paragraph>
                </div>
              }
              {
                !loading && items && items.length === 0 &&
                  <div className='search-results-item-message search-alternatives'>
                    <Paragraph>
                      {emptyText}
                    </Paragraph>
                  </div>
              }
              {
              /* Render items */
              !loading && items && items.length > 0 &&
                <table className='search-result-table'>
                  <tbody>
                    {
                  items.map((item, index) => {
                    return (
                      <tr key={nanoid()} className={`${index === focusedItemIndex ? 'active' : ''}`} onClick={() => handleItemClick(item, index)}>
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
              children
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
  itemMapping: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      style: PropTypes.object
    })
  ),
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        itemTitle: PropTypes.string,
        itemSecondary: PropTypes.string,
        itemDescription: PropTypes.string
      })
    ),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  loading: PropTypes.bool,
  loadingText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClickOutside: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSearch: PropTypes.func,
  onSelected: PropTypes.func,
  onShowDropdown: PropTypes.func,
  placeholder: PropTypes.string,
  rounded: PropTypes.bool,
  showClear: PropTypes.bool,
  showDropdown: PropTypes.bool,
  showSearch: PropTypes.bool,
  value: PropTypes.string
}

SearchField.defaultProps = {
  debounceMs: 0,
  emptyText: 'Søket gav ingen resultater...',
  loadingText: 'Søker...',
  showClear: true,
  showSearch: true
}
