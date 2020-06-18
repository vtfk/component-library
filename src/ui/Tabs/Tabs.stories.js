import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Tabs from './Tabs'

export default getConfig({ title: 'Tabs', component: Tabs })

export function Basic() {
  return <Tabs text="TODO: Tabs" />
}
