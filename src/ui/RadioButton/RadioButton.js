import PropTypes from 'prop-types'
import React from 'react'
import './RadioButton.scss'

function RadioButton({ text }) {
  return <div className={'radio-button'}>{text}</div>
}

RadioButton.propTypes = {
  text: PropTypes.string,
}

export default RadioButton
