/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Breadcrumbs from './Breadcrumbs'

describe('Breadcrumbs', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Breadcrumbs />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Breadcrumbs', () => {
    const { getByText } = render(<Breadcrumbs text={'TODO: Breadcrumbs'} />)
    expect(getByText('TODO: Breadcrumbs'))
  })
})
