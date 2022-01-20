import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { IconDropdownNav, IconDropdownNavItem } from '.'

export default getConfig(
  { title: 'IconDropdownNav', component: IconDropdownNav }
)

export function Basic () {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>En IconDropdownNav fylles med IconDropdownNavItem </td>
            <td>
              <IconDropdownNav>
                <IconDropdownNavItem title='Menyelement som link' href='https://vtfk.no' />
                <IconDropdownNavItem title='Menyelement som onClick' onClick={() => { console.log('onClick!') }} />
              </IconDropdownNav>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
