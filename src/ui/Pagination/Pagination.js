import PropTypes from 'prop-types'
import React from 'react'
import './Pagination.scss'

function Pagination({ text }) {
  return <div className={'pagination'}>{text}</div>
}

Pagination.propTypes = {
  text: PropTypes.string,
}

export default Pagination
