import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Button, IconButtonLink } from '.'

export default getConfig(
  { title: 'Button', component: Button }
)

export function Basic() {
  return (
    <Button type="a">Dette er knappeteksten</Button>
  )
}

export function Disabled() {
  return (
    <Button icon="home" disabled={true}>Dette er knappeteksten</Button>
  )
}

export function ShowSpinner() {
  return (
    <Button icon="home" spinner={true}>Dette er knappeteksten</Button>
  )
}


export function IconButton() {
  return (
    <IconButtonLink icon="home">Dette er knappeteksten</IconButtonLink>
  )
}
