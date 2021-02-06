import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { TextField } from '.'

export default getConfig(
  { title: 'TextField', component: TextField }
)

export function Basic() {
  let [value, setValue] = useState('')

  return (
    <TextField placeholder="Dette er placeholderen.." value={value} onChange={(e) => { setValue(e.target.value) }} />
  )
}

export function Types() {
  return (
    <div>
      <TextField placeholder="Placeholder.." value="" />
      <TextField type="text" placeholder="Placeholder.." value="" />
      <TextField type="email" placeholder="Placeholder.." value="" />
    </div>
  )
}

export function Textarea() {
  return (
    <div>
      <TextField rows="4" placeholder="Placeholder.." value="" />
    </div>
  )
}

export function Disabled() {
  return (
    <div>
      <TextField disabled={true} placeholder="Placeholder.." value="" />
    </div>
  )
}

export function TextNoBorder() {
  return (
    <div>
      <TextField disabled={true} noBorder={true} placeholder="Placeholder.." value="" />
    </div>
  )
}

export function TextareaNoBorder() {
  return (
    <div>
      <TextField disabled={true} noBorder={true} placeholder="Placeholder.." rows="4" value="" />
    </div>
  )
}
