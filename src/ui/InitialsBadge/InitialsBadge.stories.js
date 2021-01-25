import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { InitialsBadge } from '.'

export default getConfig(
  { title: 'InitialsBadge', component: InitialsBadge }
)

export function Basic() {
  return (
    <InitialsBadge firstName="Per" lastName="Hansen" />
  )
}

export function Sizes() {
  return (
    <table>
      <tr>
        <td>small</td>
        <td><InitialsBadge size="small" firstName="Per" lastName="Hansen" /></td>
      </tr>
      <tr>
        <td>default</td>
        <td><InitialsBadge firstName="Fred" lastName="Aker" /></td>
      </tr>
      <tr>
        <td>large</td>
        <td><InitialsBadge size="large" firstName="Nils" lastName="Pedersen" /></td>
      </tr>
    </table>
  )
}
