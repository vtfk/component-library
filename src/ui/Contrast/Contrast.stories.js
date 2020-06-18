import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Contrast from './Contrast'

export default getConfig({ title: 'Contrast', component: Contrast })

export function Basic() {
  return <Contrast text="TODO: Contrast" />
}
