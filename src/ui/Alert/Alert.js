import PropTypes from 'prop-types'
import React from 'react'
import './Alert.scss'

function Alert({ text }) {
  return <div className={'alert'}>{text}</div>
}

Alert.propTypes = {
  text: PropTypes.string,
}

export default Alert
