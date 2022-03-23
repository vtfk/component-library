import React, { useState } from 'react'
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { Button } from '.'

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

const divStyle = { display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }
const buttonStyle = { margin: '5px' }

export function Primary () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div style={divStyle}>
      <Button type='primary' size='small' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Liten knapp
      </Button>
      <Button type='primary' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Medium knapp
      </Button>
      <Button type='primary' size='large' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Stor knapp
      </Button>
    </div>
  )
}

export function Secondary () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div style={divStyle}>
      <Button type='secondary' size='small' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Liten knapp
      </Button>
      <Button type='secondary' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Medium knapp
      </Button>
      <Button type='secondary' size='large' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Stor knapp
      </Button>
    </div>
  )
}

export function Secondary2 () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div style={divStyle}>
      <Button type='secondary2' size='small' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Liten knapp
      </Button>
      <Button type='secondary2' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Medium knapp
      </Button>
      <Button type='secondary2' size='large' style={buttonStyle} onClick={clickHandler} spinner={loading}>
        Stor knapp
      </Button>
    </div>
  )
}

export function Disabled () {
  return (
    <div style={divStyle}>
      <Button disabled size='small' style={buttonStyle}>
        Liten knapp
      </Button>
      <Button disabled style={buttonStyle}>
        Medium knapp
      </Button>
      <Button disabled size='large' style={buttonStyle}>
        Stor knapp
      </Button>
    </div>
  )
}

export function ShowSpinner () {
  return (
    <div style={divStyle}>
      <Button spinner size='small' style={buttonStyle}>
        Liten knapp
      </Button>
      <Button spinner style={buttonStyle}>
        Medium knapp
      </Button>
      <Button spinner size='large' style={buttonStyle}>
        Stor knapp
      </Button>
    </div>

  )
}
