import PropTypes from 'prop-types'
import React from 'react'
import './Typography.scss'

function Typography({ text }) {
  return <div className={'typography'}>{text}</div>
}

Typography.propTypes = {
  text: PropTypes.string,
}

export default Typography
