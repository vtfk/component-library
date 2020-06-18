import PropTypes from 'prop-types'
import React from 'react'
import './IconButton.scss'

function IconButton({ text }) {
  return <div className={'icon-button'}>{text}</div>
}

IconButton.propTypes = {
  text: PropTypes.string,
}

export default IconButton
