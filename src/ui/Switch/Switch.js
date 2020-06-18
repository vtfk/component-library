import PropTypes from 'prop-types'
import React from 'react'
import './Switch.scss'

function Switch({ text }) {
  return <div className={'switch'}>{text}</div>
}

Switch.propTypes = {
  text: PropTypes.string,
}

export default Switch
