import PropTypes from 'prop-types'
import React from 'react'
import './TextArea.scss'

function TextArea({ text }) {
  return <div className={'text-area'}>{text}</div>
}

TextArea.propTypes = {
  text: PropTypes.string,
}

export default TextArea
