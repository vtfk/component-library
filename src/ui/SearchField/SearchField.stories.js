import React, { useState } from 'react'
import { withKnobs, number, text, object } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Paragraph } from '../Typography'
import { SearchField } from '.'
import { Switch } from '../Switch'
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
    itemDescription: 'Some place',
    enabled: false
  },
  {
    itemTitle: 'Tam Tam',
    itemSecondary: 'tam0202',
    itemDescription: 'Tam place',
    enabled: true
  },
  {
    itemTitle: 'Ram Ram',
    itemSecondary: 'ram0303',
    itemDescription: 'Rome place',
    enabled: false
  },
  {
    itemTitle: 'Bam Bam',
    itemSecondary: 'bam0404',
    itemDescription: 'Bome place',
    enabled: true
  },
  {
    itemTitle: 'Lam Lam',
    itemSecondary: 'lam0505',
    itemDescription: 'Lome place',
    enabled: true
  }
]

export function Basic () {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedValue, setSearchedValue] = useState('')

  function onChange (e) {
    console.log('onChange kjøres ved hver endring:', e.target.value)
    setSearchTerm(e.target.value)
  }

  function onSearch (e) {
    console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen. Tekstfeltet inneholder:', e.target.value)
    setSearchedValue(e.target.value)
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          placeholder='Dette er placeholderen'
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          rounded
        />
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td><strong>onChange: </strong></td>
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
            <td>{searchedValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function Items () {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedValue, setSearchedValue] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [searching, setSearching] = useState(false)
  const [items, setItems] = useState([])

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring:', e.target.value)
    setSearching(true)
    setSearchTerm(e.target.value)
  }

  function onSearch (e) {
    const val = e.target.value.toLowerCase()
    console.log('onSearch kjøres først når delay er ferdig ELLER tekstfeltet blir tømt. Tekstfeltet inneholder:', e.target.value)
    setSearchedValue(e.target.value)
    setItems(e.target.value === '' ? [] : defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSelected (item, index) {
    console.log('onSelected: Kjøres ved valg av item', item, index)
    setSelectedItem(item || '')
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          onSelected={(e, i) => onSelected(e, i)}
          placeholder='Søk utføres først etter 1 sekund'
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
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
            <td>{searchedValue}</td>
          </tr>
          <tr>
            <td><strong>onSelected:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{JSON.stringify(selectedItem, null, 2)}</SyntaxHighlighter>
      </div>
    </div>
  )
}

export function CustomItems () {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [items, setItems] = useState([])

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

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

  function onChange (e) {
    console.log('onChange kjører ved hver endring:', e.target.value)
    setIsSearching(true)
  }

  function onSearch (e) {
    console.log('onSearch kjøres først når delay er ferdig ELLER tekstfeltet blir tømt. Tekstfeltet inneholder:', e.target.value)
    const term = e.target.value.toLowerCase()
    setIsSearching(true)
    setSearchTerm(term)
    const matches = defaultItems.filter(item => Object.keys(item).some(key => item[key] && typeof item[key] === 'string' && item[key].toLowerCase().includes(term)))
    setItems(matches)
    setIsSearching(false)
  }

  function onSelected (item) {
    console.log('onSelected: Kjøres ved valg av item', item || '')
    setSelectedItem(item || '')
  }

  return (
    <div>
      <p>The search result items are customized by passing a <strong>itemMapping</strong> array.</p>
      <p>This allows you to choose what datafield should be rendered, as well as an optional style property</p>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 500)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          onSelected={e => onSelected(e)}
          placeholder='Søk utføres først etter 0.5 sekund'
          rounded
          loading={isSearching}
          items={items}
          itemMapping={object('Item mapping', itemMapping)}
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
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedValue, setSearchedValue] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchInputSelectedIndex, setSearchInputSelectedIndex] = useState(0)
  const [items, setItems] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring. Tekstfeltet inneholder:', e.target.value)

    setSearchTerm(e.target.value)
    setSearching(true)
  }

  function handleKeyDown (e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (showDropdown && items.length > 0 && searchInputSelectedIndex > 0) setSearchInputSelectedIndex(searchInputSelectedIndex - 1)
      if (items.length > 0) setShowDropdown(true)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (showDropdown && (items.length - 1) > searchInputSelectedIndex) setSearchInputSelectedIndex(searchInputSelectedIndex + 1)
      if (items.length > 0) setShowDropdown(true)
    }
  }

  function onSearch (e) {
    const val = e.target.value.toLowerCase()
    console.log('onSearch kjøres først når delay er ferdig ELLER tekstfeltet blir tømt. Tekstfeltet inneholder:', e.target.value)
    setSearchInputSelectedIndex(0)
    setSearchedValue(e.target.value)
    setItems(e.target.value === '' ? [] : defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSelected (index) {
    const itemIndex = Number.isInteger(index) ? index : searchInputSelectedIndex
    const item = items[itemIndex]
    console.log(`onSelected kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt index: ${index} (${itemIndex}). Valgt oppføring:`, item)
    setSearchInputSelectedIndex(itemIndex)
    setSelectedItem(item)
    setShowDropdown(false)
    setSearchTerm(item.itemTitle)
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          value={searchTerm}
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          placeholder='Søk utføres først etter 1 sekund'
          onSelected={index => onSelected(index)}
          showDropdown={showDropdown}
          onShowDropdown={(e) => setShowDropdown(e)}
          rounded
          loading={searching}
          onKeyDown={e => handleKeyDown(e)}
        >
          {
            !searching && items.length > 0 && items.map((item, index) => {
              return (
                <div onClick={() => onSelected(index)} key={index} className={`search-results-item ${index === searchInputSelectedIndex ? 'active' : ''}`} style={{ border: '1px solid green' }}>
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
            <td><strong>onChange:</strong></td>
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
            <td>{searchedValue}</td>
          </tr>
          <tr>
            <td><strong>onSelected:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{JSON.stringify(selectedItem, null, 2)}</SyntaxHighlighter>
      </div>
    </div>
  )
}

export function AdvancedChildren () {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedValue, setSearchedValue] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchInputSelectedIndex, setSearchInputSelectedIndex] = useState(0)
  const [items, setItems] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring. Tekstfeltet inneholder:', e.target.value)
    setSearchTerm(e.target.value)
    setSearching(true)
  }

  function handleKeyDown (e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (showDropdown && items.length > 0 && searchInputSelectedIndex > 0) setSearchInputSelectedIndex(searchInputSelectedIndex - 1)
      if (items.length > 0) setShowDropdown(true)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (showDropdown && (items.length - 1) > searchInputSelectedIndex) setSearchInputSelectedIndex(searchInputSelectedIndex + 1)
      if (items.length > 0) setShowDropdown(true)
    }
  }

  function onSearch (e) {
    const val = e.target.value.toLowerCase()
    console.log('onSearch kjøres først når delay er ferdig ELLER tekstfeltet blir tømt. Tekstfeltet inneholder:', e.target.value)
    setSearchInputSelectedIndex(0)
    setSearchedValue(e.target.value)
    setItems(e.target.value === '' ? [] : defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSelected (index) {
    const itemIndex = Number.isInteger(index) ? index : searchInputSelectedIndex
    const item = items[itemIndex]
    console.log(`onSelected kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt index: ${index} (${itemIndex}). Valgt oppføring:`, item)
    setSearchInputSelectedIndex(itemIndex)
    setSelectedItem(item)
    setSearchTerm(item.itemTitle)
  }

  function onCheckedItem (e, item) {
    item.enabled = !item.enabled
    e.preventDefault()
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          value={searchTerm}
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onSearch={e => onSearch(e)}
          placeholder='Søk utføres først etter 1 sekund'
          onSelected={index => onSelected(index)}
          showDropdown={showDropdown}
          onShowDropdown={(e) => { setShowDropdown(e) }}
          rounded
          loading={searching}
          onKeyDown={e => handleKeyDown(e)}
        >
          {
            !searching && items.length > 0 && items.map((item, index) => {
              return (
                <div key={index} className={`search-results-item ${index === searchInputSelectedIndex ? 'active' : ''}`} style={{ border: '1px solid green' }}>
                  <div onClick={() => onSelected(index)} style={{ display: 'flex', width: '100%' }}>
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
                  <div>
                    <Switch isActive={item.enabled} onClick={(e) => onCheckedItem(e, item)} />
                  </div>
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
            <td><strong>onChange:</strong></td>
            <td>{searchTerm}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
            <td>{searchedValue}</td>
          </tr>
          <tr>
            <td><strong>onSelected:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{JSON.stringify(selectedItem, null, 2)}</SyntaxHighlighter>
      </div>
    </div>
  )
}
