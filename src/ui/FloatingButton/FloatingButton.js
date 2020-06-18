import PropTypes from 'prop-types'
import React from 'react'
import './FloatingButton.scss'

function FloatingButton({ text }) {
  return <div className={'floating-button'}>{text}</div>
}

FloatingButton.propTypes = {
  text: PropTypes.string,
}

export default FloatingButton
