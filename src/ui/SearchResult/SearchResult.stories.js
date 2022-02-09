import React from 'react'
import { withKnobs, object, text } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SearchResult } from '.'

export default getConfig({
  title: 'SearchResult',
  component: SearchResult,
  decorators: [withKnobs]
})

export function Basic () {
  return (
    <SearchResult
      emptyMessage='Ingen resultater'
      loading={false}
      loadingText='Vennligst vent...'
      items={
        object('Items', [
          {
            title: '1',
            secondary: 'Small',
            description: 'Description'
          },
          {
            title: '2',
            secondary: 'Small',
            description: 'Description'
          },
          {
            title: '3',
            secondary: 'Small',
            description: 'Description'
          }
        ])
      }
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}

export function Loading () {
  return (
    <SearchResult
      emptyMessage='Ingen resultater'
      loading
      loadingText={text('Loading text', 'Vennligst vent...')}
      items={[]}
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}

export function Empty () {
  return (
    <SearchResult
      emptyMessage={text('Empty message', 'Ingen resultater')}
      loading={false}
      items={[]}
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}
