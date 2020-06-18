import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Expandable from './Expandable'

export default getConfig({ title: 'Expandable', component: Expandable })

export function Basic() {
  return <Expandable text="TODO: Expandable" />
}
