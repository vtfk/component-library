import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { IconDropdownNav, IconDropdownNavItem } from '.'

export default getConfig(
  { title: 'IconDropdownNav', component: IconDropdownNav }
)

export function Basic() {
  return (
    <div>
      <p>En IconDropdownNav fylles med IconDropdownNavItem:
        <IconDropdownNav>
          <IconDropdownNavItem title="Menyelement som link" href="https://vtfk.no" />
          <IconDropdownNavItem title="Menyelement som onClick" onClick={() => { console.log('onClick!') }} />
        </IconDropdownNav>
      </p>
    </div>
  )
 }
