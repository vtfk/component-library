/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Loader from './Loader'

describe('Loader', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Loader />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Loader', () => {
    const { getByText } = render(<Loader text={'TODO: Loader'} />)
    expect(getByText('TODO: Loader'))
  })
})
