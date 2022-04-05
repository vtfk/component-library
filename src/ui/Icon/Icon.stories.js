import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Icon } from '.'

export default getConfig(
  { title: 'Icon', component: Icon }
)

export function Variants () {
  return (
    <table>
      <tbody>
        <tr>
          <td>activity</td>
          <td><Icon name='activity' /></td>
        </tr>
        <tr>
          <td>add</td>
          <td><Icon name='add' /></td>
        </tr>
        <tr>
          <td>arrow-left</td>
          <td><Icon name='arrowLeft' /></td>
        </tr>
        <tr>
          <td>arrow-right</td>
          <td><Icon name='arrowRight' /></td>
        </tr>
        <tr>
          <td>check</td>
          <td><Icon name='check' /></td>
        </tr>
        <tr>
          <td>chevron-down</td>
          <td><Icon name='chevronDown' /></td>
        </tr>
        <tr>
          <td>chevron-up</td>
          <td><Icon name='chevronUp' /></td>
        </tr>
        <tr>
          <td>classes</td>
          <td><Icon name='classes' /></td>
        </tr>
        <tr>
          <td>close</td>
          <td><Icon name='close' /></td>
        </tr>
        <tr>
          <td>help</td>
          <td><Icon name='help' /></td>
        </tr>
        <tr>
          <td>home</td>
          <td><Icon name='home' /></td>
        </tr>
        <tr>
          <td>menu</td>
          <td><Icon name='menu' /></td>
        </tr>
        <tr>
          <td>pause</td>
          <td><Icon name='pause' /></td>
        </tr>
        <tr>
          <td>search</td>
          <td><Icon name='search' /></td>
        </tr>
        <tr>
          <td>statistics</td>
          <td><Icon name='statistics' /></td>
        </tr>
        <tr>
          <td>students</td>
          <td><Icon name='students' /></td>
        </tr>
      </tbody>
    </table>
  )
}

export function Sizes () {
  return (
    <table>
      <tbody>
        <tr>
          <td>auto</td>
          <td><Icon name='home' size='auto' /></td>
        </tr>
        <tr>
          <td>medium</td>
          <td><Icon name='home' size='medium' /></td>
        </tr>
        <tr>
          <td>small</td>
          <td><Icon name='home' size='small' /></td>
        </tr>
        <tr>
          <td>xsmall</td>
          <td><Icon name='home' size='xsmall' /></td>
        </tr>
      </tbody>
    </table>
  )
}
