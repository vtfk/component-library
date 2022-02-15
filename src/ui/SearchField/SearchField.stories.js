import React from 'react'
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
      onChange={event => console.log('onChange kjøres ved hver endring:', event.target.value)}
      onSearch={() => console.log('onSearch!')}
      rounded
    />
  )
}

export function Debounce () {
  return (
    <SearchField
      debounceMs={number('Delay i millisekunder', 1000)}
      onChange={event => console.log('onChange kjører ved hver endring:', event.target.value)}
      onDebounce={event => console.log('onDebounce kjøres først når delay er ferdig:', event.target.value)}
      placeholder='Søk utføres først etter 1 sekund'
      value=''
      onSearch={() => console.log('onSearch!')}
      rounded
    />
  )
}
