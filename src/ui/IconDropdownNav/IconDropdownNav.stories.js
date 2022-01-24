import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { IconDropdownNav, IconDropdownNavItem } from '.'

export default getConfig({
  title: 'IconDropdownNav',
  component: IconDropdownNav,
  decorators: [withKnobs],
  subcomponents: {
    IconDropdownNavItem
  }
})

const placements = {
  LeftBottom: 'left-bottom',
  LeftTop: 'left-top',
  RightBottom: 'right-bottom',
  RightTop: 'right-top'
}

export function Basic () {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>En IconDropdownNav fylles med IconDropdownNavItem </td>
            <td>
              <IconDropdownNav placement={select('Popup placement', placements, 'left-bottom')}>
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
