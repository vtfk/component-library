import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { boolean, number, text } from '@storybook/addon-knobs'

import { TextField } from '.'

import './stories.styles.scss'

export default getConfig(
  { title: 'TextField', component: TextField }
)

export function Basic () {
  return (
    <>
      <TextField
        value={text('Value', '')}
        placeholder={text('Placeholder', 'Placeholder...')}
        hint={text('Hint', 'Dette er ett hint')}
        required={boolean('Required', false)}
        rounded={boolean('Rounded', false)}
        noBorder={boolean('No boarder', false)}
        alwaysHint={boolean('Always show hint', false)}
        alwaysPlaceholder={boolean('Always show placeholder', false)}
        hideDetails={boolean('Hide hint', false)}
        hidePlaceholder={boolean('Hide placeholder', false)}
        onChange={(e) => console.log('Textfield changed: ' + e.target.value)}
      />
      <TextField
        value={text('Value', '')}
        placeholder={text('Placeholder', 'Placeholder...')}
        hint={text('Hint', 'Dette er ett hint')}
        rows={number('Rows', 5)}
        required={boolean('Required', false)}
        rounded={boolean('Rounded', false)}
        noBorder={boolean('No boarder', false)}
        alwaysHint={boolean('Always show hint', false)}
        alwaysPlaceholder={boolean('Always show placeholder', false)}
        hideDetails={boolean('Hide hint', false)}
        hidePlaceholder={boolean('Hide placeholder', false)}
        onChange={(e) => console.log('Textfield changed: ' + e.target.value)}
      />
    </>
  )
}

export function Rounded () {
  const [value, setValue] = useState('')

  return (
    <TextField placeholder='Dette er placeholderen..' value={value} rounded onChange={(e) => { setValue(e.target.value) }} />
  )
}

export function Types () {
  return (
    <div>
      <TextField placeholder='Placeholder email' type='email' />
      <TextField placeholder='Placeholder number' type='number' />
      <TextField placeholder='Placeholder password' type='password' />
      <TextField placeholder='Placeholder text' type='text' />
      <TextField placeholder='Placeholder email' type='email' rounded />
      <TextField placeholder='Placeholder number' type='number' rounded />
      <TextField placeholder='Placeholder password' type='password' rounded />
      <TextField placeholder='Placeholder text' type='text' rounded />
    </div>
  )
}

export function Textarea () {
  return (
    <div>
      <TextField rows='4' placeholder='Placeholder..' />
      <TextField rows='4' placeholder='Placeholder..' rounded />
    </div>
  )
}

export function Disabled () {
  return (
    <div>
      <TextField disabled placeholder='Placeholder..' />
      <TextField disabled placeholder='Placeholder..' rounded />
      <TextField disabled placeholder='Placeholder..' rows='3' />
      <TextField disabled placeholder='Placeholder..' rows='3' rounded />
    </div>
  )
}

export function Hints () {
  return (
    <div>
      <TextField hint='Dette er hint teksten til første input' placeholder='Placeholder..' />
      <TextField noBorder hint='Denne har alltid hint' alwaysHint placeholder='Placeholder..' />
      <TextField hint='Dette er hint teksten til første input' placeholder='Placeholder..' rounded />
      <TextField noBorder hint='Denne har alltid hint' alwaysHint placeholder='Placeholder..' rounded />
      <TextField hint='Dette er hint teksten til første input' placeholder='Placeholder..' rows='3' />
      <TextField noBorder hint='Denne har alltid hint' alwaysHint placeholder='Placeholder..' rows='3' rounded />
    </div>
  )
}

export function TextNoBorder () {
  return (
    <div>
      <TextField placeholder='Placeholder..' noBorder />
      <TextField placeholder='Placeholder..' noBorder rounded />
      <TextField placeholder='Placeholder..' noBorder rows='3' />
      <TextField placeholder='Placeholder..' noBorder rows='3' rounded />
    </div>
  )
}

export function Required () {
  return (
    <div>
      <TextField placeholder='Placeholder' required />
      <TextField placeholder='Placeholder' required rounded />
      <TextField placeholder='Placeholder' required rows='3' />
      <TextField placeholder='Placeholder' required rows='3' rounded />
    </div>
  )
}

export function WithClassName () {
  return (
    <div>
      <TextField placeholder='red' className='red' value='className = red' />
      <TextField placeholder='green' className='green' value='className = green' />
    </div>
  )
}
