import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import FloatingButton from './FloatingButton'

export default getConfig({ title: 'FloatingButton', component: FloatingButton })

export function Basic() {
  return <FloatingButton text="TODO: FloatingButton" />
}
