import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Select, NewSelect, SelectMultiple, NewSelectMultiple } from '.'
import { TextField } from '../TextField'
import { Checkbox } from '../Checkbox'
import { Heading3 } from '../Typography'

export default getConfig(
  { title: 'Select', component: Select }
)

export function Basic () {
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' }
  ]

  return (
    <div style={{ width: '300px', margin: '300px' }}>
      <Select
        id='id-1'
        placeholder='Dette er placeholder'
        items={items}
        selectedItem={selectedItem}
        onChange={(item) => { setSelectedItem(item) }}
      />
      <Select
        id='id-2'
        placeholder='Dette er kanskje også en placeholder'
        items={items}
        selectedItem={selectedItem}
        onChange={(item) => { setSelectedItem(item) }}
      />
    </div>
  )
}

export function Multiple () {
  const [selectedItems, setSelectedItems] = useState([])

  const items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' }
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
      id='id-2'
      placeholder='Dette er placeholderen'
      items={items}
      selectedItems={selectedItems}
      onChange={(item) => { handleMultiChange(item) }}
    />
  )
}

export function New () {
  const [selectedItem, setSelectedItem] = useState(null)

  const items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' }
  ]

  return (
    <div style={{ width: '400px', margin: '300px' }}>
      <NewSelect
        id='id-3'
        placeholder='Dette er placeholder'
        items={items}
        selectedItem={selectedItem}
        onChange={(item) => { setSelectedItem(item) }}
      />
      <NewSelect
        id='id-4'
        placeholder='Dette er kanskje også en placeholder'
        items={items}
        selectedItem={selectedItem}
        onChange={(item) => { setSelectedItem(item) }}
        closeOnSelect
        error='Du må velge noe'
      />
    </div>
  )
}

export function NewOld () {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [error, setError] = useState(null)

  const items = [
    { value: '1', label: 'Item 1' },
    { value: '2', label: 'Item 2' },
    { value: '3', label: 'Item 3' }
  ]

  function handleMultiChange (item) {
    const newArray = [...selectedItems]
    const removeIndex = newArray.map(function (item) { return item.value }).indexOf(item.value)

    if (removeIndex === -1) newArray.push(item)
    else newArray.splice(removeIndex, 1)

    setSelectedItems(newArray)
  }

  return (
    <div style={{ width: '100%', margin: '100px' }}>
      <Checkbox onChange={() => setError(!error)} label='Error' />
      <div style={{ display: 'block', marginTop: '20px' }}>
        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top', marginRight: '50px' }}>
          <Heading3>Gammel select</Heading3>

          <Select
            id='id-1'
            placeholder='Dette er placeholder'
            items={items}
            selectedItem={selectedItem}
            error={error ? 'Du må velge noe' : false}
            onChange={(item) => { setSelectedItem(item) }}
          />
        </div>
        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top', marginRight: '50px' }}>
          <Heading3>Oppdatert select</Heading3>
          <NewSelect
            id='id-2'
            placeholder='Dette er placeholder'
            items={items}
            selectedItem={selectedItem}
            error={error ? 'Du må velge noe' : false}
            onChange={(item) => { setSelectedItem(item) }}
          />
        </div>
        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top' }}>
          <Heading3>Vanlig input</Heading3>

          <TextField
            id='id-3'
            placeholder='Dette er placeholder'
            value={selectedItem ? selectedItem.label : ''}
            error={error ? 'Du må velge noe' : false}
          />
        </div>
      </div>
      <div style={{ display: 'block', position: 'absolute', top: '300px' }}>

        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top', marginRight: '50px' }}>
          <Heading3>Gammel select multiple</Heading3>

          <SelectMultiple
            id='id-4'
            placeholder='Dette er placeholder'
            items={items}
            selectedItems={selectedItems}
            onChange={(item) => { handleMultiChange(item) }}
            error={error ? 'Du må velge noe' : false}
          />
        </div>
        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top', marginRight: '50px' }}>
          <Heading3>Oppdatert select</Heading3>
          <NewSelectMultiple
            id='id-5'
            placeholder='Dette er placeholder'
            items={items}
            selectedItems={selectedItems}
            onChange={(item) => { handleMultiChange(item) }}
            error={error ? 'Du må velge noe' : false}
          />
        </div>
        <div style={{ width: '350px', display: 'inline-block', verticalAlign: 'top' }}>
          <Heading3>Vanlig input</Heading3>

          <TextField
            id='id-6'
            placeholder='Dette er placeholder'
            value={selectedItem ? selectedItems.map(item => item.label).join('\n') : ''}
            error={error ? 'Du må velge noe' : false}
          />
        </div>
      </div>
    </div>
  )
}
