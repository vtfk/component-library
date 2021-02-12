import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { RadioButton } from '.'

export default getConfig(
  { title: 'RadioButton', component: RadioButton }
)

export function Basic () {
  return (
    <div>
      <RadioButton name='name' value='value-1' label='Label 1' onChange={(e) => { console.log(e.target.value) }} />
      <RadioButton name='name' value='value-2' label='Label 2' onChange={(e) => { console.log(e.target.value) }} />
      <RadioButton name='name' value='value-3' label='Label 3' onChange={(e) => { console.log(e.target.value) }} />
    </div>
  )
}
