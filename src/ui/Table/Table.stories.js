import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import Table from './Table'

export default getConfig({ title: 'Table', component: Table })

export function Basic() {
  return <Table text="TODO: Table" />
}
