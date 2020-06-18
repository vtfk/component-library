import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Card from './Card'

export default getConfig({ title: 'Card', component: Card })

export function Basic() {
  return <Card text="TODO: Card" />
}
