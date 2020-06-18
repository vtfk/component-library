/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import TextArea from './TextArea'

describe('TextArea', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TextArea />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: TextArea', () => {
    const { getByText } = render(<TextArea text={'TODO: TextArea'} />)
    expect(getByText('TODO: TextArea'))
  })
})
