/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Expandable from './Expandable'

describe('Expandable', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Expandable />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Expandable', () => {
    const { getByText } = render(<Expandable text={'TODO: Expandable'} />)
    expect(getByText('TODO: Expandable'))
  })
})
