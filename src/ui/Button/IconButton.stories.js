import React, { useState } from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { IconButton } from '.'

export default getConfig({
  title: 'IconButton',
  component: IconButton,
  decorators: [withKnobs],
  argTypes: { onClick: { action: 'clicked' } }
})

const icons = ['home', 'arrowRight', 'arrowLeft', 'add', 'check', 'close', 'search']

export function Basic () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <IconButton icon={select('Icon', icons, 'add')} onClick={clickHandler} spinner={loading}>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function Disabled () {
  return (
    <IconButton icon={select('Icon', icons, 'add')} disabled>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function ShowSpinner () {
  return (
    <IconButton icon={select('Icon', icons, 'add')} spinner>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function Bordered () {
  return (
    <IconButton icon={select('Icon', icons, 'add')} type='transparent-bordered'>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function WithoutText () {
  return (
    <IconButton icon={select('Icon', icons, 'add')} />
  )
}

