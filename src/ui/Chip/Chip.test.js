/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Chip from './Chip'

describe('Chip', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Chip />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Chip', () => {
    const { getByText } = render(<Chip text={'TODO: Chip'} />)
    expect(getByText('TODO: Chip'))
  })
})
