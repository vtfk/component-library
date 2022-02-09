import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { boolean } from '@storybook/addon-knobs'

import { Switch } from '.'

export default getConfig(
  { title: 'Switch', component: Switch }
)

export function Basic () {
  const [isActive, setIsActive] = useState(false)

  return (
    <Switch isActive={isActive} onClick={() => { setIsActive(!isActive) }} />
  )
}

export function Disabled () {
  const [isActive, setIsActive] = useState(false)

  return (
    <Switch isActive={isActive} onClick={() => { setIsActive(!isActive) }} disabled={boolean('Initially disabled', true)} />
  )
}
