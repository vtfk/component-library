/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'

describe('Button', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Button', () => {
    const { getByText } = render(<Button text={'TODO: Button'} />)
    expect(getByText('TODO: Button'))
  })
})
