import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Logo } from '.'

export default getConfig(
  { title: 'Logo', component: Logo }
)

export function Basic() {
  return (
    <div style={{ maxWidth: '100px' }}>
      <Logo firstName="Per" lastName="Hansen"  />
    </div>
  )
}
