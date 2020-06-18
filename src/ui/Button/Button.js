import PropTypes from 'prop-types'
import React from 'react'
import './Button.scss'

function Button({ text }) {
  return <div className={'button'}>{text}</div>
}

Button.propTypes = {
  text: PropTypes.string,
}

export default Button
