import PropTypes from 'prop-types'
import React from 'react'

import './ResetStyle.scss'
import './BaseStyle.scss'

export function BaseStyle ({ children }) {
  return <>{children}</>
}

BaseStyle.propTypes = {
  children: PropTypes.object.isRequired
}
