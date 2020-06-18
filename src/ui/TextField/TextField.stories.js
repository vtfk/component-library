import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import TextField from './TextField'

export default getConfig({ title: 'TextField', component: TextField })

export function Basic() {
  return <TextField text="TODO: TextField" />
}
