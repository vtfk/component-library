/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Dropdown />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Dropdown', () => {
    const { getByText } = render(<Dropdown text={'TODO: Dropdown'} />)
    expect(getByText('TODO: Dropdown'))
  })
})
