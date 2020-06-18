/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import Tabs from './Tabs'

describe('Tabs', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Tabs />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: Tabs', () => {
    const { getByText } = render(<Tabs text={'TODO: Tabs'} />)
    expect(getByText('TODO: Tabs'))
  })
})
