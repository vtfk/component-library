import React, { useState } from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Checkbox, Table } from '../../'
import { IconButton, Button } from '../Button'
import { TextField } from '../TextField'

export default getConfig({
  title: 'Table',
  component: Table,
  decorators: [withKnobs]
})

const headers = [
  {
    label: 'DisplayName',
    value: 'itemTitle'
  },
  {
    label: 'Username',
    value: 'itemSecondary'
  },
  {
    label: 'Description',
    value: 'itemDescription'
  },
  {
    label: 'Active',
    value: 'enabled'
  }
]

const items = [
  {
    itemTitle: 'Blid Ape',
    itemSecondary: 'bli2786 🤓',
    itemDescription: 'Sande vgs',
    enabled: false
  },
  {
    itemTitle: 'Allmektig Periode',
    itemSecondary: 'all1788 🎓',
    itemDescription: 'Thor Heyerdahl videregående skole',
    enabled: true
  },
  {
    itemTitle: 'Handlende Ape',
    itemSecondary: 'han1989 🎓',
    itemDescription: 'Thor Heyerdahl videregående skole',
    enabled: false
  },
  {
    itemTitle: 'Åpen Autoritet',
    itemSecondary: 'aap0592 🤓',
    itemDescription: 'Horten vgs',
    enabled: true
  },
  {
    itemTitle: 'Åpen Linjal',
    itemSecondary: 'aap3087 🤓',
    itemDescription: 'Skogmo vgs',
    enabled: true
  },
  {
    itemTitle: 'Falsk Bagatell Ape',
    itemSecondary: 'fal1587 🤓',
    itemDescription: 'Nøtterøy vgs',
    enabled: true
  },
  {
    itemTitle: 'Tapper Servitrise',
    itemSecondary: 'tap2481 🎓',
    itemDescription: 'Horten videregående skole',
    enabled: true
  },
  {
    itemTitle: 'Tapper Bokhandel',
    itemSecondary: 'tap2387 🎓',
    itemDescription: 'Færder videregående skole',
    enabled: true
  },
  {
    itemTitle: 'Skapende Doktor',
    itemSecondary: 'ska0181 🎓',
    itemDescription: 'Nøtterøy videregående skole',
    enabled: true
  }
]

export function Basic () {
  return (
    <Table
      headers={object('Headers', headers)}
      items={object('Items', items)}
      itemId='itemSecondary'
    />
  )
}

export function Select () {
  const [selectedIds, setSelectedIds] = useState([])
  return (
    <>
      <button onClick={() => setSelectedIds([])} style={{marginBottom: '0.5rem'}}>Clear selected</button>
      <Table
        headers={object('Headers', headers)}
        items={object('Items', items)}
        itemId='itemSecondary'
        showSelect
        selectedIds={selectedIds}
        selectOnClick
        onSelectedIdsChanged={ids => { console.log('Selected ids', ids), setSelectedIds(ids) }}
        onSelectedItemsChanged={items => console.log('Selected items:', items)}
      />
    </>

  )
}

export function CustomStyle () {
  const customHeaders = [
    {
      label: 'DisplayName',
      value: 'itemTitle',
      style: { textTransform: 'Uppercase', color: 'blue' }
    },
    {
      label: 'Username',
      value: 'itemSecondary',
      itemStyle: { backgroundColor: 'pink', textAlign: 'center' }
    },
    {
      label: 'Skole',
      value: 'itemDescription'
    },
    {
      label: 'Active',
      value: 'enabled'
    }
  ]

  return (
    <Table
      headers={object('Headers', customHeaders)}
      items={object('Items', items)}
      itemId='itemSecondary'
      headerStyle={{ textDecoration: 'underline', color: 'red' }}
      showSelect
      selectOnClick
      onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
      onSelectedItemsChanged={items => console.log('Selected items:', items)}
    />
  )
}


export function CustomRendering () {
  const customHeaders = [
    {
      label: 'DisplayName',
      value: 'itemTitle',
    },
    {
      label: 'Username',
      value: 'itemSecondary',
      element: <div>This is a element</div>
    },
    {
      label: 'Description',
      value: 'itemDescription',
      render: (h) => {
        return (
          <TextField
            placeholder={h.label}
            alwaysHint={true}
            hint="Header rendered as TextField..."
            rounded
            style={{marginBottom: '0'}}
            hidePlaceholder={true}
          />
        )
      }
    },
    {
      label: 'Active',
      value: 'enabled',
      style: { textAlign: 'center' },
      itemStyle: { display: 'flex', justifyContent: 'center' },
      render: (header) => {
        return (
          <Button style={{marginLeft: 'auto', marginRight: 'auto'}}>{header.label}</Button>
        )
      },
      itemRender: (item, index, header) => {
        return (
          <div>
            <IconButton onClick={(e) => {
              console.log('Clicked item', item);
              console.log('At index', index);
              console.log('Under header', header);
              console.log('Event', e)
              }}
            />
          </div>
        )
      }
    }
  ]

  return (
    <Table
      headers={customHeaders}
      items={items}
      itemId='itemSecondary'
      showSelect
      selectOnClick
      onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
      onSelectedItemsChanged={items => console.log('Selected items:', items)}
    />
  )
}

export function ItemsWithElements () {
  const _items = JSON.parse(JSON.stringify(items))
  const newItems = _items.map(item => {
    item._elements = {
      enabled: <Checkbox checked={item.enabled} onChange={() => console.log('Heihei', item.itemTitle)} />
    }

    return item
  })

  return (
    <Table
      headers={object('Headers', headers)}
      items={newItems}
      itemId='itemSecondary'
      showSelect
      selectOnClick
      onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
      onSelectedItemsChanged={items => console.log('Selected items:', items)}
    />
  )
}

export function Mobile () {
  return (
    <Table
      headers={object('Headers', headers)}
      items={object('Items', items)}
      itemId='itemSecondary'
      showSelect
      selectOnClick
      onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
      onSelectedItemsChanged={items => console.log('Selected items:', items)}
      mobileHeaderText="Mobile header"
      mode='mobile'
    />
  )
}
