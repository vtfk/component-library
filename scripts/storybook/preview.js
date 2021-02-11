import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addParameters } from '@storybook/client-api'
import { BaseStyle } from '../../src'

import './storybook.css'

addParameters({
  viewMode: 'canvas',
  layout: 'padded',
  html: {
    prettier: {
      tabWidth: 2
    },
    root: '#example > div'
  }
})

addDecorator(withInfo)
addDecorator(Story => (<BaseStyle><div id='example'><Story /></div></BaseStyle>))
