/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Table from './Table'

describe('Table', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Table', () => {
    const { getByText } = render(<Table text={'TODO: Table'} />)
    expect(getByText('TODO: Table'))
  })
})
