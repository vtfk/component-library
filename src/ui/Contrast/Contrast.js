import PropTypes from 'prop-types'
import React from 'react'
import './Contrast.scss'

function Contrast({ text }) {
  return <div className={'contrast'}>{text}</div>
}

Contrast.propTypes = {
  text: PropTypes.string,
}

export default Contrast
