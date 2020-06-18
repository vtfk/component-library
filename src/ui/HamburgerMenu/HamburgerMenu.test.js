/* eslint-disable no-console */
import { render } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import HamburgerMenu from './HamburgerMenu'

describe('HamburgerMenu', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<HamburgerMenu />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  test('finds TODO: HamburgerMenu', () => {
    const { getByText } = render(<HamburgerMenu text={'TODO: HamburgerMenu'} />)
    expect(getByText('TODO: HamburgerMenu'))
  })
})
