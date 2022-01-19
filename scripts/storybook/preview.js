import React from 'react'
import { addDecorator } from '@storybook/react'
import { BaseStyle } from '../../src'

import './storybook.css'

export const parameters = {
  viewMode: 'canvas',
  layout: 'padded',
  html: {
    prettier: {
      tabWidth: 2
    },
    root: 'div#example'
  }
}

addDecorator(Story => (<BaseStyle><div id='example'><Story /></div></BaseStyle>))
