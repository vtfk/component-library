import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import IconButton from './IconButton'

export default getConfig({ title: 'IconButton', component: IconButton })

export function Basic() {
  return <IconButton text="TODO: IconButton" />
}
