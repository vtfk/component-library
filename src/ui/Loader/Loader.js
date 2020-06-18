import PropTypes from 'prop-types'
import React from 'react'
import './Loader.scss'

function Loader({ text }) {
  return <div className={'loader'}>{text}</div>
}

Loader.propTypes = {
  text: PropTypes.string,
}

export default Loader
