import PropTypes from 'prop-types'
import React from 'react'
import './Tabs.scss'

function Tabs({ text }) {
  return <div className={'tabs'}>{text}</div>
}

Tabs.propTypes = {
  text: PropTypes.string,
}

export default Tabs
