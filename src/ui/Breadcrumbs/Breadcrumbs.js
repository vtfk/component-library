import PropTypes from 'prop-types'
import React from 'react'
import './Breadcrumbs.scss'

function Breadcrumbs({ text }) {
  return <div className={'breadcrumbs'}>{text}</div>
}

Breadcrumbs.propTypes = {
  text: PropTypes.string,
}

export default Breadcrumbs
