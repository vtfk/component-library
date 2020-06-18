/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'

describe('Modal', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Modal />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Modal', () => {
    const { getByText } = render(<Modal text={'TODO: Modal'} />)
    expect(getByText('TODO: Modal'))
  })
})
