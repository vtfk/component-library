/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Typography from './Typography'

describe('Typography', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Typography />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Typography', () => {
    const { getByText } = render(<Typography text={'TODO: Typography'} />)
    expect(getByText('TODO: Typography'))
  })
})
