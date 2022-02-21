import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { withKnobs, number, object, text } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { Paragraph } from '../Typography'
import { SearchField } from '.'

export default getConfig({
  title: 'SearchField2',
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
    <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
      <SearchField
        placeholder='Dette er placeholderen'
        value=''
        onChange={e => console.log('onChange kjøres ved hver endring. Tekstfeltet inneholder:', e.target.value)}
        onSearch={value => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen. Tekstfeltet inneholder:', value)}
        rounded
      />
    </div>
  )
}

export function Items () {
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')
  const [searched, setSearched] = useState('')
  const [searching, setSearching] = useState(false)
  const [items, setItems] = useState([])

  // show items as a knob, just for documentation purposes
  object('Items', defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring. Tekstfeltet inneholder:', e.target.value)
    setValue(e.target.value)
    setSearching(true)
  }

  function onDebounce (e) {
    console.log('onDebounce kjøres først når delay er ferdig. Tekstfeltet inneholder:', e.target.value)
    setDebounced(e.target.value)
    const val = e.target.value.toLowerCase()
    setItems(defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSearch (value) {
    console.log('onSearch kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt oppføring:', value)
    setSearched(JSON.stringify(value, null, 2))
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onDebounce={e => onDebounce(e)}
          placeholder='Søk utføres først etter 1 sekund'
          value=''
          onSearch={e => onSearch(e)}
          rounded
          loading={searching}
          loadingText={text('Loading text', 'Søker... (her kan man sette inn tekst eller HTML)')}
          emptyText={text('Empty text', 'Søket gav ingen resultater... (her kan man sette inn tekst eller HTML)')}
          items={items}
          onItemClick={e => onSearch(e)}
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
            <td><strong>onDebounce:</strong></td>
            <td>{debounced}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
          </tr>
        </tbody>
      </table>
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{searched}</SyntaxHighlighter>
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

  function onDebounce (e) {
    console.log('onDebounce kjøres først når delay er ferdig. Tekstfeltet inneholder:', e.target.value)
    setDebounced(e.target.value)
    const val = e.target.value.toLowerCase()
    setItems(defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSearch (value) {
    const item = JSON.stringify(items[searchInputSelectedIndex], null, 2)
    console.log(`onSearch kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges. Valgt index: ${searchInputSelectedIndex}. Valgt oppføring: ${item}`)
    setSearched(item)
  }

  return (
    <div>
      <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
        <SearchField
          debounceMs={number('Delay i millisekunder', 1000)}
          onChange={e => onChange(e)}
          onDebounce={e => onDebounce(e)}
          placeholder='Søk utføres først etter 1 sekund'
          value=''
          onSearch={e => onSearch(e)}
          rounded
          loading={searching}
          onKeyDown={e => handleKeyDown(e)}
        >
          {
            !searching && items.length > 0 && items.map((item, index) => {
              return (
                <div onMouseDown={item => onSearch(item)} key={index} className={`search-results-item ${index === searchInputSelectedIndex ? 'active' : ''}`} style={{ border: '1px solid green' }}>
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
            <td>{value}</td>
          </tr>
          <tr>
            <td><strong>onDebounce:</strong></td>
            <td>{debounced}</td>
          </tr>
          <tr>
            <td><strong>onSearch:</strong></td>
          </tr>
        </tbody>
      </table>
      <br /><br />
      <div>
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{searched}</SyntaxHighlighter>
      </div>
    </div>
  )
}
