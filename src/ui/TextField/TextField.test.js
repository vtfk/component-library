/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import TextField from './TextField'

describe('TextField', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TextField />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: TextField', () => {
    const { getByText } = render(<TextField text={'TODO: TextField'} />)
    expect(getByText('TODO: TextField'))
  })
})
