import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Select, SelectMultiple } from '.'

export default getConfig(
  { title: 'Select', component: Select }
)

export function Basic() {
  let [selectedItem, setSelectedItem] = useState(null)

  let items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' },
  ]

  return (
    <Select
      id="id-1"
      placeholder="Dette er placeholderen"
      items={items}
      selectedItem={selectedItem}
      onChange={(item) => { setSelectedItem(item) }}
    />
  )
}

export function Multiple() {
  let [selectedItems, setSelectedItems] = useState([])

  let items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' },
  ]

  function handleMultiChange(item) {
    const newArray = [...selectedItems]
    const removeIndex = newArray.map(function (item) { return item.value }).indexOf(item.value)

    if (removeIndex === -1) newArray.push(item)
    else newArray.splice(removeIndex, 1)

    setSelectedItems(newArray)
  }

  return (
    <SelectMultiple
      id="id-2"
      placeholder="Dette er placeholderen"
      items={items}
      selectedItems={selectedItems}
      onChange={(item) => { handleMultiChange(item) }}
    />
  )
}
