import PropTypes from 'prop-types'
import React from 'react'
import './TextField.scss'

function TextField({ text }) {
  return <div className={'text-field'}>{text}</div>
}

TextField.propTypes = {
  text: PropTypes.string,
}

export default TextField
