import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Illustration } from '.'

export default getConfig(
  { title: 'Illustration', component: Illustration }
)

export function Variants () {
  return (
    <table className="illustration-table">
      <tbody>
        <tr>
          <td>work</td>
          <td><Illustration name='work' /></td>
        </tr>
        <tr>
          <td>outdoors</td>
          <td><Illustration name='outdoors' /></td>
        </tr>
        <tr>
          <td>people</td>
          <td><Illustration name='people' /></td>
        </tr>
        <tr>
          <td>health</td>
          <td><Illustration name='health' /></td>
        </tr>
        <tr>
          <td>sports</td>
          <td><Illustration name='sports' /></td>
        </tr>
        <tr>
          <td>immigrant</td>
          <td><Illustration name='immigrant' /></td>
        </tr>
        <tr>
          <td>climate</td>
          <td><Illustration name='climate' /></td>
        </tr>
        <tr>
          <td>culture</td>
          <td><Illustration name='culture' /></td>
        </tr>
        {
          /*
          <tr>
            <td>mobility</td>
            <td><Illustration name='mobility' /></td>
          </tr>
          */
        }
        <tr>
          <td>learn</td>
          <td><Illustration name='learn' /></td>
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
          <td><Illustration name='work' /></td>
        </tr>
        <tr>
          <td>auto</td>
          <td><Illustration name='work' size='auto' /></td>
        </tr>
        <tr>
          <td>small</td>
          <td><Illustration name='work' size='small' /></td>
        </tr>
        <tr>
          <td>xsmall</td>
          <td><Illustration name='work' size='xsmall' /></td>
        </tr>
      </tbody>
    </table>
  )
}
