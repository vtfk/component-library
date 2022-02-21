import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { withKnobs, number, text } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

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
        onChange={e => console.log('onChange kjøres ved hver endring:', e.target.value)}
        onSearch={value => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen', value)}
        rounded
      />
    </div>
  )
}

export function Debounce () {
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')

  function onChange (e) {
    console.log('onChange kjører ved hver endring:', e.target.value)
    setValue(e.target.value)
  }

  function onDebounce (e) {
    console.log('onDebounce kjøres først når delay er ferdig:', e.target.value)
    setDebounced(e.target.value)
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
          onSearch={() => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen')}
          rounded
        />
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

export function DebounceSearch () {
  const [value, setValue] = useState('')
  const [debounced, setDebounced] = useState('')
  const [searched, setSearched] = useState('')
  const [searching, setSearching] = useState(false)
  const [items, setItems] = useState(defaultItems)

  function onChange (e) {
    console.log('onChange kjører ved hver endring:', e.target.value)
    setValue(e.target.value)
    setSearching(true)
  }

  function onDebounce (e) {
    console.log('onDebounce kjøres først når delay er ferdig:', e.target.value)
    setDebounced(e.target.value)
    const val = e.target.value.toLowerCase()
    setItems(defaultItems.filter(item => (item.itemTitle && item.itemTitle.toLowerCase().includes(val)) || (item.itemSecondary && item.itemSecondary.toLowerCase().includes(val)) || (item.itemDescription && item.itemDescription.toLowerCase().includes(val))))
    setSearching(false)
  }

  function onSearch (value) {
    console.log('onSearch kjøres ved "Enter", klikk på søkeknappen eller når en oppføring i lista velges', value)
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
            <td><strong>onChange</strong></td>
            <td>{value}</td>
          </tr>
          <tr>
            <td><strong>onDebounce</strong></td>
            <td>{debounced}</td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'text-bottom', paddingTop: `${searched ? '25px' : '1px'}` }}><strong>onSearch</strong></td>
            <td><SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>{searched}</SyntaxHighlighter></td>
          </tr>
        </tbody>
      </table>
      <br /><br />
      <div>
        Items i lista:
        <SyntaxHighlighter language='json' style={docco} wrapLines customStyle={{ background: 'none' }}>
          {JSON.stringify(defaultItems, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
