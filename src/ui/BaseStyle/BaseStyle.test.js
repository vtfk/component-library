import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import BaseStyle from './BaseStyle'

describe('BaseStyle', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BaseStyle />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('returns children data', () => {
    const { getByText } = render(<BaseStyle>Hello, World!</BaseStyle>)
    expect(getByText('Hello, World!'))
  })
})
