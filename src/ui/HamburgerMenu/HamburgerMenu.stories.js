import { action } from '@storybook/addon-actions'
import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import HamburgerMenu from './HamburgerMenu'

export default getConfig({ title: 'HamburgerMenu', component: HamburgerMenu })

export function Basic() {
  return <HamburgerMenu text="TODO: HamburgerMenu" />
}
