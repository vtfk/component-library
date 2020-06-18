/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import TopNavigation from './TopNavigation'

describe('TopNavigation', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TopNavigation />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: TopNavigation', () => {
    const { getByText } = render(<TopNavigation text={'TODO: TopNavigation'} />)
    expect(getByText('TODO: TopNavigation'))
  })
})
