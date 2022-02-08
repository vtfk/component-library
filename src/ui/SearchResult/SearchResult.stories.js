import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SearchResult } from '.'

export default getConfig(
  { title: 'SearchResult', component: SearchResult }
)

export function Basic () {
  return (
    <SearchResult
      emptyMessage="Ingen resultater"
      loading={false}
      loadingText={'Vennligst vent...'}
      items={
        [
          {
            title: '1',
            secondary: 'Small',
            description: 'Description',
          },
          {
            title: '2',
            secondary: 'Small',
            description: 'Description',
          },
          {
            title: '3',
            secondary: 'Small',
            description: 'Description',
          },
        ]
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
      emptyMessage="Ingen resultater"
      loading={true}
      loadingText={'Vennligst vent...'}
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
      emptyMessage="Ingen resultater"
      loading={false}
      items={[]}
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}
