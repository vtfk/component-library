import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Checkbox } from '.'

export default getConfig(
  { title: 'Checkbox', component: Checkbox }
)

export function Basic () {
  return (
    <Checkbox name='gruppe-navn' value='verdi' label='Dette er labelen' onChange={() => { console.log('onChange!') }} />
  )
}
