import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Modal from './Modal'

export default getConfig({ title: 'Modal', component: Modal })

export function Basic() {
  return <Modal text="TODO: Modal" />
}
