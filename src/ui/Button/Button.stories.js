import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Button, IconButtonLink } from '.'

export default getConfig(
  { title: 'Button', component: Button }
)

export function Basic () {
  return (
    <Button type='a'>Dette er knappeteksten</Button>
  )
}

export function Disabled () {
  return (
    <Button icon='home' disabled>Dette er knappeteksten</Button>
  )
}

export function ShowSpinner () {
  return (
    <Button icon='home' spinner>Dette er knappeteksten</Button>
  )
}

export function iconButton () {
  return (
    <IconButton icon={select('Icon', icons, 'add')}>
      {text('Button text', 'Legg til element')}
    </IconButton>
  )
}
