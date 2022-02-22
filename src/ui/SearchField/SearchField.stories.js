import React, { useState } from 'react'
import { withKnobs, number, text, object } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Paragraph } from '../Typography'
import { SearchField } from '.'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default getConfig({
  title: 'SearchField',
  component: SearchField,
  decorators: [withKnobs]
})

const defaultItems = [
  {
    itemTitle: 'Sam Sam',
    itemSecondary: 'sam0101',
    itemDescription: 'Some place'
  },
  {
    itemTitle: 'Tam Tam',
    itemSecondary: 'tam0202',
    itemDescription: 'Tam place'
  },
  {
    itemTitle: 'Ram Ram',
    itemSecondary: 'ram0303',
    itemDescription: 'Rome place'
  },
  {
    itemTitle: 'Bam Bam',
    itemSecondary: 'bam0404',
    itemDescription: 'Bome place'
  },
  {
    itemTitle: 'Lam Lam',
    itemSecondary: 'lam0505',
    itemDescription: 'Lome place'
  }
]

export function Basic () {
  return (
    <div>
      <SearchField
        placeholder='Dette er placeholderen'
        value={text('value', '')}
        onChange={e => console.log('onChange kjøres ved hver endring:', e.target.value)}
        onSearch={() => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen')}
        rounded
      />
    </div>
  )
}

export function Items () {
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [searching, setSearching] = useState(false)
  const [items, setItems] = useState([])

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring:', e.target.value)
    setSearching(true)
    setValue(e.target.value)
  }

  function onSearch (e) {
    console.log('onSearch kjøres først når delay er ferdig:', e.target.value)
    const val = e.target.value.toLowerCase()
    setSearchValue(e.target.value)
    setItems(defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSelected (value, index) {
    console.log('onSelected: Kjøres ved valg av item', value, index)
    setSelectedItem(value ? JSON.stringify(value, null, 2) : '')
  }

  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          onSelected={(e, i) => onSelected(e, i)}
          placeholder='Søk utføres først etter 1 sekund'
          value={value}
          rounded
          loading={searching}
          loadingText={text('Loading text', 'Søker... (her kan man sette inn tekst eller HTML)')}
          emptyText={text('Empty text', 'Søket gav ingen resultater... (her kan man sette inn tekst eller HTML)')}
          items={items}
        />
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td><strong>onChange: </strong></td>
            <td>{value}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
            <td>{searchValue}</td>
          </tr>
          <tr>
            <td><strong>onSelected:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{selectedItem}</SyntaxHighlighter>
      </div>
    </div>
  )
}

export function CustomItems () {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [items, setItems] = useState([])

  const itemMapping = [
    {
      value: 'itemTitle',
      style: { textAlign: 'left', color: 'red', fontWeight: 'bold', fontSize: '23px' }
    },
    {
      value: 'itemSecondary',
      style: { backgroundColor: 'blue', color: 'white', textAlign: 'center' }
    },
    {
      value: 'itemDescription',
      style: { fontFamily: "'Brush Script MT', cursive", textTransform: 'uppercase', textAlign: 'right' }
    }
  ]

  function onSearch (e) {
    const term = e.target.value.toLowerCase()
    setIsSearching(true)

    const matches = []
    for (const item of defaultItems) {
      let matched = false
      for (const key of Object.keys(item)) {
        if (matched) continue
        const type = typeof item[key]
        if (type === 'function' || type === 'object' || type === 'undefined') continue

        if (item[key].toLowerCase().includes(term)) matched = true
      }

      if (matched) matches.push(item)
    }

    setItems(matches)
    setIsSearching(false)
  }

  return (
    <div>
      <p>The search result items are customized by passing a itemMapping array.</p>
      <p>This allows you to choose what datafield should be rendered, as well as an optional style property</p>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 500)}
          onChange={() => setIsSearching(true)}
          onSearch={e => { onSearch(e) }}
          onSelected={e => { setSelectedItem(e || '') }}
          placeholder='Søk utføres først etter 0.5 sekund'
          rounded
          loading={isSearching}
          items={items}
          itemMapping={itemMapping}
        />
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td><strong>Is searching: </strong></td>
            <td>{isSearching.toString()}</td>
          </tr>
          <tr>
            <td><strong>SearchTerm: </strong></td>
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td><strong>selectedItem:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{JSON.stringify(selectedItem, null, 2)}</SyntaxHighlighter>
      </div>
    </div>
  )
}

export function Children () {
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')
  const [searched, setSearched] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchInputSelectedIndex, setSearchInputSelectedIndex] = useState(0)
  const [items, setItems] = useState([])

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring. Tekstfeltet inneholder:', e.target.value)
    setValue(e.target.value)
    setSearching(true)
  }

  function handleKeyDown (e) {
    if (e.key === 'ArrowUp') {
      if (items.length > 0 && searchInputSelectedIndex > 0) setSearchInputSelectedIndex(searchInputSelectedIndex - 1)
    } else if (e.key === 'ArrowDown') {
      if ((items.length - 1) > searchInputSelectedIndex) setSearchInputSelectedIndex(searchInputSelectedIndex + 1)
    }
  }

  function onSearch (e) {
    const val = e.target.value.toLowerCase()
    console.log('onSearch kjøres først når delay er ferdig. Tekstfeltet inneholder:', e.target.value)
    setDebounced(e.target.value)
    setItems(defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSelected (value, index) {
    if (Number.isInteger(index)) {
      const item = items[index]
      console.log(`onSelected kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt index: ${index}. Valgt oppføring:`, item)
      setSearchInputSelectedIndex(index)
      setSearched(JSON.stringify(item, null, 2))
      console.log('SelectedItem:', searched)
    } else if (value) {
      const item = items[searchInputSelectedIndex]
      if (item) {
        console.log(`onSelected kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt index: ${searchInputSelectedIndex}. Valgt oppføring:`, item)
        setSearched(JSON.stringify(item, null, 2))
      } else {
        setSearched('')
      }
    }
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          placeholder='Søk utføres først etter 1 sekund'
          value=''
          onSelected={(e, i) => onSelected(e, i)}
          rounded
          loading={searching}
          onKeyDown={e => handleKeyDown(e)}
        >
          {
            !searching && items.length > 0 && items.map((item, index) => {
              return (
                <div onMouseDown={item => onSelected(item, index)} key={index} className={`search-results-item ${index === searchInputSelectedIndex ? 'active' : ''}`} style={{ border: '1px solid green' }}>
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
            !searching && items.length === 0 &&
              <div className='search-results-item-message search-alternatives'>
                <Paragraph>
                  {text('Empty text', 'Søket gav ingen resultater... (her kan man sette inn tekst eller HTML)')}
                </Paragraph>
              </div>
          }

          {
            searching &&
              <div className='search-results-item-message search-alternatives'>
                <Paragraph>
                  {text('Loading text', 'Søker... (her kan man sette inn tekst eller HTML)')}
                </Paragraph>
              </div>
          }
        </SearchField>
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td><strong>onChange</strong></td>
            <td>{value}</td>
          </tr>
          <tr>
            <td><strong>onDebounce</strong></td>
            <td>{debounced}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
