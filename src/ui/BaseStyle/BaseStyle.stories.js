import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { BaseStyle } from '.'
import { Heading3 } from '../Typography'

export default getConfig({ title: 'BaseStyle', component: BaseStyle })

export const Basic = () => (
  <BaseStyle>
    <Heading3>Hello world, with correct font!</Heading3>
  </BaseStyle>
)

Basic.parameters = {
  info: {
    text: 'The BaseStyle component should wrap your applications <App> component, so default styling is set properly. This includes fonts, and default CSS resets.'
  }
}
