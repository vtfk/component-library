/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Alert from './Alert'

describe('Alert', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Alert />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Alert', () => {
    const { getByText } = render(<Alert text={'TODO: Alert'} />)
    expect(getByText('TODO: Alert'))
  })
})
