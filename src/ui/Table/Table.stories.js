import React, { useState } from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Checkbox, Table } from '../../'
import { IconButton, Button } from '../Button'
import { TextField } from '../TextField'
import { nanoid } from 'nanoid'

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

export function ActiveHeaders () {
  const activeHeaders = JSON.parse(JSON.stringify(headers)).map(header => {
    header.onClick = () => console.log('You have click the header', header.label)
    return header
  })

  return (
    <Table
      headers={object('Headers', activeHeaders)}
      items={object('Items', items)}
      itemId='itemSecondary'
    />
  )
}

export function Select () {
  const [selectedIds, setSelectedIds] = useState([])
  return (
    <>
      <button onClick={() => setSelectedIds([])} style={{ marginBottom: '0.5rem' }}>Clear selected</button>
      <Table
        headers={object('Headers', headers)}
        items={object('Items', items)}
        itemId='itemSecondary'
        showSelect
        selectedIds={selectedIds}
        selectOnClick
        onSelectedIdsChanged={ids => { console.log('Selected ids', ids); setSelectedIds(ids) }}
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
      tooltip: 'This is a tooltip for the displayName header',
      itemTooltip: 'itemSecondary',
      style: { textTransform: 'Uppercase', color: 'blue' }
    },
    {
      label: 'Username',
      value: 'itemSecondary',
      itemTooltip: 'This is just a text tooltip that dont match any data',
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
      value: 'itemTitle'
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
            alwaysHint
            hint='Header rendered as TextField...'
            rounded
            style={{ marginBottom: '0' }}
            hidePlaceholder
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
          <Button style={{ marginLeft: 'auto', marginRight: 'auto' }}>{header.label}</Button>
        )
      },
      itemRender: (value, item, index, header) => {
        return (
          <div>
            <IconButton
              icon='add' onClick={(e) => {
                console.log('Clicked item', item)
                console.log('At index', index)
                console.log('Under header', header)
                console.log('Event', e)

                e.preventDefault()
                e.stopPropagation()
              }}
            >{value.toString()}
            </IconButton>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <h2 style={{ margin: '0.2rem 0' }}>Custom rendering</h2>
      Works by adding a callback functions to the header entries that returns JSX
      <h4 style={{ marginBottom: '0.2rem' }}>Custom header renderer</h4>
      {'render: (header) => { return ({<>{ header.label }</>}){}}'}
      <ul style={{ marginTop: '0.3rem' }}>
        <li>header = Header object</li>
      </ul>
      <h4 style={{ marginBottom: '0.2rem' }}>Custom item renderer</h4>
      {/* eslint-disable-next-line */}
      {'itemRender: (value, item, header, index) => { return (<>{`${item.firstname} ${item.lastName}`}</>)}'}
      <ul style={{ marginTop: '0.3rem' }}>
        <li>value = Value that would have been displayed in regular rendering</li>
        <li>item = Item object for the row</li>
        <li>header = Header object for the column</li>
        <li>index = Array index of the item</li>
      </ul>
      <Table
        headers={customHeaders}
        items={items}
        itemId='itemSecondary'
        showSelect
        selectOnClick
        onSelectedIdsChanged={ids => console.log('Selected ids', ids)}
        onSelectedItemsChanged={items => console.log('Selected items:', items)}
      />
    </div>
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
      mobileHeaderText='Mobile header'
      mode='mobile'
    />
  )
}

export function BigTables () {
  const headers = [
    {
      label: 'Field A',
      value: 'fieldA'
    },
    {
      label: 'Field B',
      value: 'fieldB'
    },
    {
      label: 'Field C',
      value: 'fieldC'
    },
    {
      label: 'Field D',
      value: 'fieldD'
    },
    {
      label: 'Field E',
      value: 'fieldD'
    },
    {
      label: 'Field F',
      value: 'fieldD'
    }
  ]

  const items = []
  for (let i = 1; i < 100; i++) {
    items.push({
      fieldA: nanoid(),
      fieldB: nanoid(),
      fieldC: nanoid(),
      fieldD: nanoid(),
      fieldE: nanoid(),
      fieldF: nanoid()
    })
  }

  return (
    <>
      <p>This table is inside a div with a height of <b>250px</b></p>
      <div style={{ height: '250px' }}>
        <Table
          headers={headers}
          items={items}
        />
      </div>
      <p>This table has a height of <b>250px</b> set in the style props</p>
      <Table
        headers={headers}
        items={items}
        style={{ height: '250px' }}
      />
      <p>This table inside a parent with a width of <b>250px</b> and height of <b>150px</b></p>
      <div style={{ width: '500px', height: '150px' }}>
        <Table
          headers={headers}
          items={items}
        />
      </div>
      <p>This table has no size limitations</p>
      <Table
        headers={headers}
        items={items}
      />
    </>
  )
}
