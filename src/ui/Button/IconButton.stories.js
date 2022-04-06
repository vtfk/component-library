import React, { useState } from 'react'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { IconButton } from '.'
import { icons } from '../Icon'

const iconList = Object.keys(icons);

export default getConfig({
  title: 'IconButton',
  component: IconButton,
  decorators: [withKnobs],
  argTypes: { onClick: { action: 'clicked' } }
})

export function Basic () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <IconButton icon={select('Icon', iconList, 'add')} onClick={clickHandler} spinner={loading}>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function Disabled () {
  return (
    <IconButton icon={select('Icon', iconList, 'add')} disabled>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function ShowSpinner () {
  return (
    <IconButton icon={select('Icon', iconList, 'add')} spinner>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function Bordered () {
  const [loading, setLoading] = useState(false)

  const clickHandler = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <IconButton icon={select('Icon', iconList, 'add')} bordered onClick={() => clickHandler()} spinner={loading}>
      {text('Icon Button text', 'Legg til element')}
    </IconButton>
  )
}

export function WithoutText () {
  const [loading, setLoading] = useState(false)

  const clickHandler = (msg) => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <IconButton icon={select('Icon', iconList, 'add')} onClick={() => clickHandler()} spinner={loading} />
  )
}
