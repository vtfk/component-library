/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import MediaCard from './MediaCard'

describe('MediaCard', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MediaCard />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: MediaCard', () => {
    const { getByText } = render(<MediaCard text={'TODO: MediaCard'} />)
    expect(getByText('TODO: MediaCard'))
  })
})
