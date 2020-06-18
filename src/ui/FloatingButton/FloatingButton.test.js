/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import FloatingButton from './FloatingButton'

describe('FloatingButton', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FloatingButton />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: FloatingButton', () => {
    const { getByText } = render(<FloatingButton text={'TODO: FloatingButton'} />)
    expect(getByText('TODO: FloatingButton'))
  })
})
