/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Contrast from './Contrast'

describe('Contrast', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Contrast />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Contrast', () => {
    const { getByText } = render(<Contrast text={'TODO: Contrast'} />)
    expect(getByText('TODO: Contrast'))
  })
})
