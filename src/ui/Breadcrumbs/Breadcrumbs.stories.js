import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Breadcrumbs from './Breadcrumbs'

export default getConfig({ title: 'Breadcrumbs', component: Breadcrumbs })

export function Basic() {
  return <Breadcrumbs text="TODO: Breadcrumbs" />
}
