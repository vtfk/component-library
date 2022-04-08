import './style.scss'
import { Checkbox } from '../Checkbox'
import { Spinner } from '../Spinner'
import React, { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { mergeStyles, mergeClasses } from './lib/helpers'
import PropTypes from 'prop-types'
import get from 'lodash.get'

export function Table ({ headers, items, itemId = '_id', selectedIds, mode, showSelect = false, selectOnClick = false, isLoading, loadingText, loadingElement, noDataText, noDataElement, mobileHeaderText, mobileHeaderElement, onSelectedIdsChanged, onSelectedItemsChanged, style, headerClass, headerStyle, itemClass, itemStyle, trClass, trStyle }) {
  /*
    State
  */
  const [_selectedIds, setSelectedIds] = useState(selectedIds && Array.isArray(selectedIds) ? selectedIds : [])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  /*
    Effects
  */
  useEffect(() => {
    // Update selected ids if updated externally
    if (selectedIds !== undefined) {
      setSelectedIds(selectedIds)
      callbackSelected(selectedIds)
    }

    // Handle when window is resized
    function handleResize () {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [selectedIds])

  /*
    Memos
  */
  // Is the table rendered in desktop or mobile mode?
  const renderMode = useMemo(() => {
    // If the mode has been provided in props
    if (mode && ['desktop', 'mobile'].includes(mode)) return mode
    // Determine the mode based on window width treshold
    if (windowWidth <= 750) return 'mobile'
    return 'desktop'
  }, [windowWidth, mode])

  // Parse and get valid headers to use in the table
  const validHeaders = useMemo(() => {
    if (!Array.isArray(headers) || headers.length === 0) return []

    const vHeaders = []
    for (const h of headers) {
      if (!h.label && (!h.render && typeof h.render !== 'function')) {
        console.error('Header is invalid because it got no label or render function', h);
        continue
      } 
      if (!h.value && (!h.itemRender && typeof h.itemRender !== 'function')) {
        console.error('Header is invalid because it got no value or itemRender function', h);
        continue
      } 
      vHeaders.push(h)
    }

    return vHeaders
  }, [headers])

  const hasData = useMemo(() => {
    return (items && Array.isArray(items) && items.length > 0)
  }, [items])

  // Are every items selected?
  const isAllSelected = useMemo(() => {
    if (!items || !Array.isArray(items) || items.length === 0) return false
    if (!_selectedIds || !Array.isArray(_selectedIds) || _selectedIds.length === 0) return false
    return items.length === _selectedIds.length
  }, [_selectedIds, items])

  /*
    Functions
  */
  // Function to update what items are selected and trigger callbacks
  function updateSelected (id) {
    // Input validation
    if (items.length === 0) return
    if (!id) return
    if (typeof id !== 'string' && !Array.isArray(id)) return

    // The new ids
    let newIds = []

    // Add or remove id based on what is applicable
    if (Array.isArray(id)) newIds = id
    else if (!_selectedIds.includes(id)) newIds = [..._selectedIds, id]
    else newIds = _selectedIds.filter((i) => i !== id)

    // Update the state
    setSelectedIds(newIds)

    // Callback selected
    callbackSelected(newIds)
  }

  function callbackSelected (ids) {
    // Make sure that ids is valid
    if (!ids || !Array.isArray(ids)) ids = []

    // Determine what items are selected
    let selectedItems = []
    if (ids.length > 0 && items && Array.isArray(items)) selectedItems = items.filter((i) => ids.includes(i[itemId]))

    // Trigger callback
    if (onSelectedIdsChanged && typeof onSelectedIdsChanged === 'function') onSelectedIdsChanged(ids)
    if (onSelectedItemsChanged && typeof onSelectedItemsChanged === 'function') onSelectedItemsChanged(selectedItems)
  }

  // Select or deselect all items
  function selectAll () {
    if (items.length === 0) return

    // Updated ids and items
    let newIds

    // Determine what to do
    if (_selectedIds.length !== items.length) newIds = items.map((i) => i[itemId])
    else newIds = []

    // Update the selected
    updateSelected(newIds)
  }

  // Returns if a item is selected
  function isSelected (item) {
    return _selectedIds.includes(item[itemId])
  }

  function getHeaderValue (header) {
    // If no header
    if (!header) return ''

    // If the header has a render function
    if (header.render && typeof header.render === 'function') {
      try {
        const result = header.render(header)
        if (result && typeof result === 'object') return result
      } catch (err) { console.error('Error rendering header', err) }
    }

    // If the header has a element
    if (header.element && typeof header.element === 'object') return header.element

    // If the header label is number or boolean
    if (typeof header.label !== 'string') return header.label.toString()

    // Return
    return header.label || ''
  }

  // Gets a value from a given path in an object
  function getValueAsString (item, path) {
    try {
      // Retreive the value
      let value = get(item, path)

      // If item value is not string, convert it before returning
      if (typeof value === 'object') value = JSON.stringify(value)
      else if (typeof value !== 'string' && value.toString) {
        value = value.toString()
      }

      return value
    } catch { return '' }
  }

  // Gets the appropriate value to render for a item
  function getItemValue (item, header, index) {
    // If no item or header, just return a empty string
    if (!item || !header) return ''

    // Retreive the value
    const value = get(item, header.value)

    // If the header has a render function for the item
    if (header.itemRender && typeof header.itemRender === 'function') {
      try {
        const result = header.itemRender(value, item, header, index)
        if (result && typeof result === 'object') return result
      } catch (err) { console.error('Error rendering item', err) }
    }

    // If the item contain a element
    if (item._elements?.[header.value]) return item._elements?.[header.value]

    // If the item has no matching value
    if (!value) return ''

    // If item value is not string, convert it before returning
    if (typeof value === 'object') return JSON.stringify(value)
    else if (typeof value !== 'string' && value.toString) {
      return value.toString()
    }

    // Return
    return value
  }

  /*
    Render
  */
  return (
    <div className={`vtfk-table-container ${renderMode}`} style={style}>
      {validHeaders.length === 0 && <div>Table cannot be shown when no headers are specified</div>}

      {validHeaders.length > 0 &&
        <>
          {
        /* Desktop mode */
        renderMode === 'desktop' &&
          <table className='vtfk-table' cellSpacing='0' cellPadding='0'>
            <thead>
              <tr>
                {
              // Render checkboxs for selecting all items if applicable
              showSelect && items &&
                <th className={mergeClasses('vtfk-table-checkbox-cell', headerClass)} style={headerStyle}>
                  <Checkbox checked={isAllSelected} name='checkAll' value='checkAll' label={' '} onChange={(e) => selectAll()} style={{ padding: 0, margin: 0, marginRight: 0, display: 'block' }} />
                </th>
            }
                {
              // Render all headers
              validHeaders.map((header) =>
                <th
                  key={nanoid()}
                  className={mergeClasses(headerClass, header.class)}
                  style={mergeStyles(headerStyle, header.style)}
                  title={getValueAsString(header, header.itemTooltip) || header.tooltip}
                >
                  {
                    getHeaderValue(header)
                  }
                </th>
              )
            }
              </tr>
            </thead>
            <tbody>
              {
            isLoading &&
              <tr>
                {
                loadingElement ||
                  <td colSpan={1000} height='100%' className={mergeClasses('vtfk-table-loading-td')}>
                    <div className='vtfk-table-loading-container'>
                      <h2 style={{ margin: 0, marginBottom: '0.2rem' }}>{loadingText || 'Laster'}</h2>
                      <Spinner size='large' />
                    </div>
                  </td>
              }
              </tr>
          }
              {
            !isLoading && hasData &&
            items.map((item, index) => {
              return (
                <tr
                  key={item[itemId]}
                  onClick={(e) => selectOnClick && updateSelected(item[itemId])}
                  className={mergeClasses(trClass, isSelected(item) ? 'tr-selected' : '', selectOnClick ? 'tr-select-onclick' : '')}
                  style={mergeStyles(trStyle)}
                >
                  {
                    // Render checkbox for selecting the item in the current row, if applicable
                    showSelect &&
                      <td className='vtfk-table-checkbox-cell'>
                        <Checkbox checked={isSelected(item)} onChange={() => updateSelected(item[itemId])} onClick={(e) => e.stopPropagation()} style={{ display: 'block' }} />
                      </td>
                  }
                  {
                    // Render item
                    validHeaders.map((header) => {
                      return (
                        <td
                          key={nanoid()}
                          className={mergeClasses(itemClass, header.itemClass)}
                          style={mergeStyles(itemStyle, header.itemStyle)}
                          title={getValueAsString(item, header.itemTooltip) || header.itemTooltip}
                        >
                          {getItemValue(item, header, index)}
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
              {
            !isLoading && !hasData &&
              <tr>
                <td colSpan={validHeaders.length + 1} style={{ textAlign: 'center' }}>
                  {noDataElement || noDataText || 'Ingen data er funnet'}
                </td>
              </tr>
          }
            </tbody>
          </table>
      }
          {
        /* Mobile mode */
        renderMode === 'mobile' &&
          <table className='vtfk-table vtfk-table-mobile' cellSpacing='0' cellPadding='0'>
            {
          (mobileHeaderElement || mobileHeaderText || showSelect) &&
            <thead>
              <tr className='vtfk-table-mobile-header-row'>
                <td>
                  {!!mobileHeaderElement && mobileHeaderElement}
                  {!mobileHeaderElement &&
                    <div className={mergeClasses('vtfk-table-mobile-header', headerClass)} style={mergeStyles(headerStyle)}>
                      <div className='vtfk-table-mobile-header-text'>{mobileHeaderText}</div>
                      <div className='vtfk-table-mobile-selectall'><Checkbox checked={isAllSelected} name='checkAll' value='checkAll' onChange={(e) => selectAll()} /></div>
                    </div>}
                </td>
              </tr>
            </thead>
          }
            <tbody>
              {
              isLoading &&
                <tr>
                  {
                  loadingElement ||
                    <td colSpan={1000} height='100%' className={mergeClasses('vtfk-table-loading-td')}>
                      <div className='vtfk-table-loading-container'>
                        <h2 style={{ margin: 0, marginBottom: '0.2rem' }}>{loadingText || 'Laster'}</h2>
                        <Spinner size='large' />
                      </div>
                    </td>
                }
                </tr>
            }
              {
              !isLoading && hasData &&
              items.map((item, index) => {
                return (
                  <tr
                    key={item[itemId]}
                    onClick={(e) => selectOnClick && updateSelected(item[itemId])}
                    className={mergeClasses('vtfk-table-mobile-item', itemClass, isSelected(item) ? 'tr-selected' : '')}
                    style={mergeStyles(trStyle)}
                  >
                    {
                      showSelect &&
                        <td className='vtfk-table-mobile-row'>
                          <div />
                          <div><Checkbox checked={isSelected(item)} onChange={(e) => updateSelected(item[itemId])} onClick={(e) => e.stopPropagation()} /></div>
                        </td>
                    }
                    {
                      validHeaders.map((header) => {
                        return (
                          <td key={`${item[itemId]}-${header.value}`} className='vtfk-table-mobile-row'>
                            <div
                              className={mergeClasses('vtfk-table-mobile-item-header', headerClass, header.class)}
                              style={mergeStyles(headerStyle, header.style)}
                            >
                              {getHeaderValue(header)}
                            </div>
                            <div
                              className={mergeClasses('vtfk-table-mobile-item-value', itemClass, header.itemClass)}
                              style={mergeStyles(itemStyle, header.itemStyle)}
                            >
                              {getItemValue(item, header, index)}
                            </div>
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
              {
              !isLoading && !hasData &&
                <tr>
                  <td colSpan={validHeaders.length + 1} style={{ textAlign: 'center' }}>
                    {noDataElement || noDataText || 'Ingen data er funnet'}
                  </td>
                </tr>
            }
            </tbody>
          </table>
      }
        </>}
    </div>
  )
}

Table.propTypes = {
  headerClass: PropTypes.string,
  headerStyle: PropTypes.object,
  headers: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    class: PropTypes.string,
    itemClass: PropTypes.string,
    render: PropTypes.func,
    itemRender: PropTypes.func,
    tooltip: PropTypes.string,
    itemTooltip: PropTypes.string,
    element: PropTypes.element
  })).isRequired,
  isLoading: PropTypes.bool,
  itemClass: PropTypes.string,
  itemId: PropTypes.string,
  itemStyle: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  loadingElement: PropTypes.element,
  loadingText: PropTypes.string,
  mobileHeaderElement: PropTypes.element,
  mobileHeaderText: PropTypes.string,
  mode: PropTypes.oneOf([
    'desktop',
    'mobile'
  ]),
  noDataElement: PropTypes.element,
  noDataText: PropTypes.string,
  onSelectedIdsChanged: PropTypes.func,
  onSelectedItemsChanged: PropTypes.func,
  selectOnClick: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  showSelect: PropTypes.bool,
  style: PropTypes.object,
  trClass: PropTypes.string,
  trStyle: PropTypes.object
}
