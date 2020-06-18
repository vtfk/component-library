import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import TextArea from './TextArea'

export default getConfig({ title: 'TextArea', component: TextArea })

export function Basic() {
  return <TextArea text="TODO: TextArea" />
}
