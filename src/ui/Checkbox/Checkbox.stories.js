import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { boolean, withKnobs } from '@storybook/addon-knobs'

import { Checkbox } from '.'

export default getConfig({
  title: 'Checkbox',
  component: Checkbox,
  decorators: [withKnobs]
})

export function Basic () {
  const [checked, setChecked] = useState(false)

  function onChange () {
    setChecked(!checked)
    console.log('onChange!')
  }

  return (
    <Checkbox
      name='gruppe-navn'
      value='verdi'
      label='Dette er labelen'
      checked={checked}
      onChange={() => { onChange() }}
    />
  )
}

export function disabled () {
  const [checked, setChecked] = useState(false)

  function onChange () {
    setChecked(!checked)
    console.log('onChange!')
  }

  return (
    <Checkbox
      name='gruppe-navn'
      value='verdi'
      label='Dette er labelen'
      disabled={boolean('Initially disabled', true)}
      checked={checked}
      onChange={() => { onChange() }}
    />
  )
}

export function simple () {
  const [checked, setChecked] = useState(false)

  function onChange () {
    setChecked(!checked)
  }

  return (
    <Checkbox
      checked={checked}
      onChange={() => { onChange() }}
    />
  )
}
