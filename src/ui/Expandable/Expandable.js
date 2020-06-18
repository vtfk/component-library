import PropTypes from 'prop-types'
import React from 'react'
import './Expandable.scss'

function Expandable({ text }) {
  return <div className={'expandable'}>{text}</div>
}

Expandable.propTypes = {
  text: PropTypes.string,
}

export default Expandable
