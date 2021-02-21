import React, { useState } from 'react'
import { withKnobs, text, object, boolean } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Select, SelectMultiple } from '.'

export default getConfig({
  title: 'Select',
  component: Select,
  decorators: [withKnobs]
})

export function Basic () {
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
    { value: '1', label: 'Årsak 1' },
    { value: '2', label: 'Årsak 2' },
    { value: '3', label: 'Årsak 3' }
  ]

  return (
    <Select
      placeholder={text('Placeholder', 'Velg en årsak for varselet')}
      label={text('Label', 'Valgt årsak for varselet')}
      isOpen={boolean('Initially open', false)}
      closeOnSelect={boolean('Close on selection', true)}
      items={object('Items', items)}
      selectedItem={selectedItem}
      onChange={(item) => { setSelectedItem(item) }}
      style={{ margin: '20px' }}
    />
  )
}

export function Multiple () {
  const [selectedItems, setSelectedItems] = useState([])

  const items = [
    { value: '1', label: 'Årsak 1' },
    { value: '2', label: 'Årsak 2' },
    { value: '3', label: 'Årsak 3' }
  ]

  function handleMultiChange (item) {
    const newArray = [...selectedItems]
    const removeIndex = newArray.map(function (item) { return item.value }).indexOf(item.value)

    if (removeIndex === -1) newArray.push(item)
    else newArray.splice(removeIndex, 1)

    setSelectedItems(newArray)
  }

  return (
    <SelectMultiple
      placeholder={text('Placeholder', 'Velg en eller flere årsaker for varselet')}
      label={text('Label', 'Valgte årsaker for varselet')}
      isOpen={boolean('Initially open', false)}
      items={object('Items', items)}
      selectedItems={selectedItems}
      onChange={(item) => { handleMultiChange(item) }}
      style={{ margin: '20px' }}
    />
  )
}
