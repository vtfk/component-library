import PropTypes from 'prop-types'
import React from 'react'
import './TopNavigation.scss'

function TopNavigation({ text }) {
  return <div className={'top-navigation'}>{text}</div>
}

TopNavigation.propTypes = {
  text: PropTypes.string,
}

export default TopNavigation
