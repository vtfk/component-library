import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

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
