import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Loader from './Loader'

export default getConfig({ title: 'Loader', component: Loader })

export function Basic() {
  return <Loader text="TODO: Loader" />
}
