/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import IconButton from './IconButton'

describe('IconButton', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<IconButton />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: IconButton', () => {
    const { getByText } = render(<IconButton text={'TODO: IconButton'} />)
    expect(getByText('TODO: IconButton'))
  })
})
