import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import MediaCard from './MediaCard'

export default getConfig({ title: 'MediaCard', component: MediaCard })

export function Basic() {
  return <MediaCard text="TODO: MediaCard" />
}
