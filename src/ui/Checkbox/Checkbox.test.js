/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Checkbox />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Checkbox', () => {
    const { getByText } = render(<Checkbox text={'TODO: Checkbox'} />)
    expect(getByText('TODO: Checkbox'))
  })
})
