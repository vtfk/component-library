import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Spinner } from '.'

export default getConfig(
  { title: 'Spinner', component: Spinner }
)

export function Sizes() {
  return (
    <div>
      <div style={{width: '200px'}}>
        <Spinner size="auto" />
      </div>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner size="xlarge" />
    </div>
  )
}

export function Transparent() {
  return (
    <Spinner size="medium" transparent={true} />
  )
}
