import React, { useState } from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SearchField } from '.'

export default getConfig({
  title: 'SearchField',
  component: SearchField,
  decorators: [withKnobs]
})

export function Basic () {
  return (
    <SearchField
      placeholder='Dette er placeholderen'
      value=''
      onChange={e => console.log('onChange kjøres ved hver endring:', e.target.value)}
      onSearch={() => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen')}
      rounded
    />
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
      <SearchField
        debounceMs={number('Delay i millisekunder', 1000)}
        onChange={e => onChange(e)}
        onDebounce={e => onDebounce(e)}
        placeholder='Søk utføres først etter 1 sekund'
        value=''
        onSearch={() => console.log('onSearch kjøres ved "Enter" eller klikk på søkeknappen')}
        rounded
      />
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
