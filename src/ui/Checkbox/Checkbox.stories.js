import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Checkbox from './Checkbox'

export default getConfig({ title: 'Checkbox', component: Checkbox })

export function Basic() {
  return <Checkbox text="TODO: Checkbox" />
}
