import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Chip from './Chip'

export default getConfig({ title: 'Chip', component: Chip })

export function Basic() {
  return <Chip text="TODO: Chip" />
}
