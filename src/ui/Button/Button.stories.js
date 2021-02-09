import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { Button, IconButton } from '.'

export default getConfig({
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
  argTypes: { onClick: { action: 'clicked' } }
})

const types = {
  Primary: 'primary',
  Secondary: 'secondary',
  Secondary2: 'secondary2'
}

const sizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large'
}

const icons = ['home', 'arrowRight', 'arrowLeft', 'add', 'check', 'close', 'search']

export function Basic () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <Button
      type={select('Button type', types, 'primary')}
      size={select('Button size', sizes, 'medium')}
      spinner={loading || boolean('Spinning', false)}
      disabled={boolean('Disabled', false)}
      onClick={clickHandler}
    >
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function Primary () {
  return (
    <Button type='primary'>
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function Secondary () {
  return (
    <Button type='secondary'>
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function Secondary2 () {
  return (
    <Button type='secondary2'>
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function Disabled () {
  return (
    <Button disabled>
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function ShowSpinner () {
  return (
    <Button spinner>
      {text('Button text', 'Dette er knappeteksten')}
    </Button>
  )
}

export function iconButton () {
  return (
    <IconButton icon={select('Icon', icons, 'add')}>
      {text('Button text', 'Legg til element')}
    </IconButton>
  )
}
