import PropTypes from 'prop-types'
import React from 'react'
import './Modal.scss'

function Modal({ text }) {
  return <div className={'modal'}>{text}</div>
}

Modal.propTypes = {
  text: PropTypes.string,
}

export default Modal
