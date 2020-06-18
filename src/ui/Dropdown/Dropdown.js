import PropTypes from 'prop-types'
import React from 'react'
import './Dropdown.scss'

function Dropdown({ text }) {
  return <div className={'dropdown'}>{text}</div>
}

Dropdown.propTypes = {
  text: PropTypes.string,
}

export default Dropdown
