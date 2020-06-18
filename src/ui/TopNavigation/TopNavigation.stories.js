import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import TopNavigation from './TopNavigation'

export default getConfig({ title: 'TopNavigation', component: TopNavigation })

export function Basic() {
  return <TopNavigation text="TODO: TopNavigation" />
}
