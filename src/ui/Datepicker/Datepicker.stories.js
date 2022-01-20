import React from 'react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Datepicker } from '.'

export default getConfig({
  title: 'Datepicker',
  component: Datepicker,
  decorators: [withKnobs]
})

const placements = {
  Auto: 'auto',
  AutoEnd: 'auto-end',
  AutoStart: 'auto-start',
  Bottom: 'bottom',
  BottomEnd: 'bottom-end',
  BottomStart: 'bottom-start',
  Left: 'left',
  LeftEnd: 'left-end',
  LeftStart: 'left-start',
  Right: 'right',
  RightEnd: 'right-end',
  RightStart: 'right-start',
  Top: 'top',
  TopEnd: 'top-end',
  TopStart: 'top-start'
}

export function Basic () {
  return (
    <div>
      <p>Ikke valgt dato:</p>
      <Datepicker
        placeholder='Dette er placeholderen'
        placement={select('Popup placement', placements, 'bottom-start')}
        onChange={() => { console.log('onChange!') }}
      />
      <p>Valgt dato:</p>
      <Datepicker
        placeholder='Dette er placeholderen'
        selected={new Date()}
        placement={select('Popup placement', placements, 'bottom-start')}
        onChange={() => { console.log('onChange!') }}
      />
    </div>
  )
}
