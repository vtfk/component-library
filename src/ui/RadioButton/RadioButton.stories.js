import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { boolean, withKnobs } from '@storybook/addon-knobs'

import { RadioButton } from '.'

export default getConfig({
  title: 'RadioButton',
  component: RadioButton,
  decorators: [withKnobs]
})

export function Basic () {
  return (
    <div>
      <RadioButton name='name' value='value-1' label='Label 1' onChange={(e) => { console.log(e.target.value) }} />
      <RadioButton name='name' value='value-2' label='Label 2' onChange={(e) => { console.log(e.target.value) }} />
      <RadioButton name='name' value='value-3' label='Label 3' onChange={(e) => { console.log(e.target.value) }} />
    </div>
  )
}

export function disabled () {
  return (
    <div>
      <RadioButton
        name='name'
        value='value-1'
        label='Label 1'
        disabled={boolean('Initially disabled', true)}
        onChange={(e) => { console.log(e.target.value) }}
      />
    </div>
  )
}

export function Required () {
  return (
    <div>
      <RadioButton
        name='name'
        value='value-1'
        label='Label 1'
        required={boolean('Initially required', true)}
        onChange={(e) => { console.log(e.target.value) }}
      />
    </div>
  )
}
