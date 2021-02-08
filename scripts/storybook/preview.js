import React from 'react'
import { addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { addParameters } from '@storybook/client-api'
import { BaseStyle } from '../../src'

import './storybook.css'

addParameters({
  viewMode: 'docs'
})

addDecorator(withInfo)
addDecorator(Story => (<BaseStyle><Story /></BaseStyle>))
