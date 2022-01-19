import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SideNav, SideNavItem } from '.'
import { Icon } from '../Icon'

export default getConfig(
  { title: 'SideNav', component: SideNav }
)

export function Basic () {
  return (
    <SideNav title='SideNav'>
      <SideNavItem href='https://vtfk.no' icon={<Icon name='home' size='small' />} title='Link 1' active />
      <SideNavItem href='https://vtfk.no' icon={<Icon name='students' size='small' />} title='Link 2' />
      <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='small' />} title='Link 3' />
    </SideNav>
  )
}
