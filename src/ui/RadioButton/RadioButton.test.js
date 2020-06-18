/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import RadioButton from './RadioButton'

describe('RadioButton', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RadioButton />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: RadioButton', () => {
    const { getByText } = render(<RadioButton text={'TODO: RadioButton'} />)
    expect(getByText('TODO: RadioButton'))
  })
})
