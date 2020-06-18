import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Alert from './Alert'

export default getConfig({ title: 'Alert', component: Alert })

export function Basic() {
  return <Alert text="TODO: Alert" />
}
