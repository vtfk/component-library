import PropTypes from 'prop-types'
import React from 'react'
import './Table.scss'

function Table({ text }) {
  return <div className={'table'}>{text}</div>
}

Table.propTypes = {
  text: PropTypes.string,
}

export default Table
