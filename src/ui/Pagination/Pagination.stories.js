import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Pagination from './Pagination'

export default getConfig({ title: 'Pagination', component: Pagination })

export function Basic() {
  return <Pagination text="TODO: Pagination" />
}
