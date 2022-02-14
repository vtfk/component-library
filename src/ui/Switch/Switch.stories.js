import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import { Switch } from '.'

export default getConfig({
  title: 'Switch',
  component: Switch,
  decorators: [withKnobs]
})

export function Basic () {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <Switch isActive={isActive} onClick={() => { setIsActive(!isActive) }} /><br/>
      <Switch label="Denne har en label" isActive={isActive} onClick={() => { setIsActive(!isActive) }} /><br/>
      <Switch label="Denne har også en label" isActive={isActive} onClick={() => { setIsActive(!isActive) }} />
      <Switch label="Denne er på samme linje" isActive={isActive} onClick={() => { setIsActive(!isActive) }} />
    </div>
  )
}

export function Disabled () {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <Switch isActive={isActive} onClick={() => { setIsActive(!isActive) }} disabled={boolean('Initially disabled', true)} /> <br/>
      <Switch label="Denne er disabled" isActive={isActive} onClick={() => { setIsActive(!isActive) }} disabled={boolean('Initially disabled', true)} />
    </div>
    
    
  )
}
