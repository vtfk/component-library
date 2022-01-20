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
  const [emailValue, setEmailValue] = useState('')
  const [numberValue, setNumberValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [textValue, setTextValue] = useState('')

  return (
    <div>
      <TextField placeholder='Placeholder email' value={emailValue} type='email' onChange={e => { setEmailValue(e.target.value) }} />
      <TextField placeholder='Placeholder number' value={numberValue} type='number' onChange={e => { setNumberValue(e.target.value) }} />
      <TextField placeholder='Placeholder password' value={passwordValue} type='password' onChange={e => { setPasswordValue(e.target.value) }} />
      <TextField placeholder='Placeholder text' value={textValue} type='text' onChange={e => { setTextValue(e.target.value) }} />
    </div>
  )
}

export function Textarea () {
  const [value, setValue] = useState('')

  return (
    <div>
      <TextField rows='4' placeholder='Placeholder..' value={value} onChange={(e) => { setValue(e.target.value) }} />
    </div>
  )
}

export function Disabled () {
  return (
    <div>
      <TextField disabled placeholder='Placeholder..' value='' onChange={() => { /* This is here just to silence the 'onChange is required' warning */ }} />
    </div>
  )
}

export function TextNoBorder () {
  const [value, setValue] = useState('')

  return (
    <div>
      <TextField noBorder placeholder='Placeholder..' value={value} onChange={(e) => { setValue(e.target.value) }} />
    </div>
  )
}

export function TextareaNoBorder () {
  const [value, setValue] = useState('')

  return (
    <div>
      <TextField noBorder placeholder='Placeholder..' rows={10} value={value} onChange={(e) => { setValue(e.target.value) }} />
    </div>
  )
}
