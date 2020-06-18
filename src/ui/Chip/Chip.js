import PropTypes from 'prop-types'
import React from 'react'
import './Chip.scss'

function Chip({ text }) {
  return <div className={'chip'}>{text}</div>
}

Chip.propTypes = {
  text: PropTypes.string,
}

export default Chip
