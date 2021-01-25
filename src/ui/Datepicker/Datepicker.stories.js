import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Datepicker } from '.'

export default getConfig(
  { title: 'Datepicker', component: Datepicker }
)

export function Basic() {
  return (
    <div>
      <p>Ikke valgt dato:</p>
      <Datepicker placeholder="Dette er placeholderen" onChange={() => { console.log('onChange!') }} />
      <p>Valgt dato:</p>
      <Datepicker placeholder="Dette er placeholderen" selected={new Date()} onChange={() => { console.log('onChange!') }} />
    </div>
  )
 }
