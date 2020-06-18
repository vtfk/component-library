/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'

describe('Card', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Card />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Card', () => {
    const { getByText } = render(<Card text={'TODO: Card'} />)
    expect(getByText('TODO: Card'))
  })
})
