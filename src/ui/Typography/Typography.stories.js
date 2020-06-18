import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Typography from './Typography'

export default getConfig({ title: 'Typography', component: Typography })

export function Basic() {
  return <Typography text="TODO: Typography" />
}
