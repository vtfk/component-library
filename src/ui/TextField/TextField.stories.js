import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { TextField } from '.'

export default getConfig(
  { title: 'TextField', component: TextField }
)

export function Basic () {
  const [value, setValue] = useState('')

  return (
    <TextField placeholder='Dette er placeholderen..' value={value} onChange={(e) => { setValue(e.target.value) }} />
  )
}

export function Types () {
  return (
    <div>
      <TextField placeholder='Placeholder..' value='' />
      <TextField type='text' placeholder='Placeholder..' value='' />
      <TextField type='email' placeholder='Placeholder..' value='' />
    </div>
  )
}

export function Textarea () {
  return (
    <div>
      <TextField rows='4' placeholder='Placeholder..' value='' />
    </div>
  )
}

export function Disabled () {
  return (
    <div>
      <TextField disabled placeholder='Placeholder..' value='' />
    </div>
  )
}

export function TextNoBorder () {
  return (
    <div>
      <TextField disabled noBorder placeholder='Placeholder..' value='' />
    </div>
  )
}

export function TextareaNoBorder () {
  return (
    <div>
      <TextField disabled noBorder placeholder='Placeholder..' rows='4' value='' />
    </div>
  )
}
