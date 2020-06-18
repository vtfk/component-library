/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Pagination from './Pagination'

describe('Pagination', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Pagination />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Pagination', () => {
    const { getByText } = render(<Pagination text={'TODO: Pagination'} />)
    expect(getByText('TODO: Pagination'))
  })
})
