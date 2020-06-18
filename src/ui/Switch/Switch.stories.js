import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Switch from './Switch'

export default getConfig({ title: 'Switch', component: Switch })

export function Basic() {
  return <Switch text="TODO: Switch" />
}
