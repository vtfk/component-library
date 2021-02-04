import PropTypes from 'prop-types'
import React from 'react'

import './ResetStyle.scss'
import './BaseStyle.scss'

function BaseStyle ({ children }) {
  return <>{children}</>
}

BaseStyle.propTypes = {
  children: PropTypes.object.isRequired
}

export default BaseStyle
