import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Checkbox } from '.'

export default getConfig(
  { title: 'Checkbox', component: Checkbox }
)

export function Basic () {
  const [checked, setChecked] = useState(false)

  function onChange () {
    setChecked(!checked)
    console.log('onChange!')
  }

  return (
    <Checkbox name='gruppe-navn' value='verdi' label='Dette er labelen' checked={checked} onChange={() => { onChange() }} />
  )
}
