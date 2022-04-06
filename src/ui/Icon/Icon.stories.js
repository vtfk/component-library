import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, select } from '@storybook/addon-knobs'
import { Icon, icons } from '.'

export default getConfig(
  {
    title: 'Icon',
    component: Icon,
    decorators: [withKnobs]
  }
)

const sizes = ['none', 'xsmall', 'small', 'medium', 'auto']

export function Variants () {
  return (
    <table>
      <tbody>
        {
          Object.keys(icons).map((i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td><Icon name={i} size={select('size', sizes, 'none')} /></td>
              </tr>
            )
          })
        }
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
