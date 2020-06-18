/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Switch from './Switch'

describe('Switch', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Switch />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Switch', () => {
    const { getByText } = render(<Switch text={'TODO: Switch'} />)
    expect(getByText('TODO: Switch'))
  })
})
