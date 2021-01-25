import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { CardLink } from '.'

export default getConfig(
  { title: 'CardLink', component: CardLink }
)

export function Basic() {
  return (
    <div>
      <p>Ved bruk som link (href):</p>
      <CardLink href="https://vtfk.no">Dette er teksten</CardLink>
      <p>Ved bruk av onClick:</p>
      <CardLink onClick={() => { console.log('onClick!') }}>Dette er teksten</CardLink>
    </div>
  )
}
