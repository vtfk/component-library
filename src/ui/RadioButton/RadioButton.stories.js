import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import RadioButton from './RadioButton'

export default getConfig({ title: 'RadioButton', component: RadioButton })

export function Basic() {
  return <RadioButton text="TODO: RadioButton" />
}
