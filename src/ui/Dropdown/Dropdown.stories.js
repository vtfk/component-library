import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Dropdown from './Dropdown'

export default getConfig({ title: 'Dropdown', component: Dropdown })

export function Basic() {
  return <Dropdown text="TODO: Dropdown" />
}
