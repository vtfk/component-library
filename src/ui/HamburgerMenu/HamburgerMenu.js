import PropTypes from 'prop-types'
import React from 'react'
import './HamburgerMenu.scss'

function HamburgerMenu({ text }) {
  return <div className={'hamburger-menu'}>{text}</div>
}

HamburgerMenu.propTypes = {
  text: PropTypes.string,
}

export default HamburgerMenu
