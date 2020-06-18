import PropTypes from 'prop-types'
import React from 'react'
import './Checkbox.scss'

function Checkbox({ text }) {
  return <div className={'checkbox'}>{text}</div>
}

Checkbox.propTypes = {
  text: PropTypes.string,
}

export default Checkbox
