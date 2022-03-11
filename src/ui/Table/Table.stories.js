import React, { useState } from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Checkbox, Table } from '../../'

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
  return (
    <Table
      headers={object('Headers', headers)}
      items={object('Items', items)}
      itemId='itemSecondary'
      showSelect
      selectOnClick
      onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
      onSelectedItemsChanged={items => console.log('Selected items:', items)}
    />
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
      label: 'Description',
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

export function CustomItems () {
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
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox checked={checked} onChange={() => { console.log('yoyo'); setChecked(!checked) }} />
      <Table
        headers={object('Headers', headers)}
        items={object('Items', items)}
        itemId='itemSecondary'
        showSelect
        selectOnClick
        onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
        onSelectedItemsChanged={items => console.log('Selected items:', items)}
        mode='mobile'
      />
    </div>
  )
}
