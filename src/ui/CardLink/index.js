import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as ArrowIcon } from './icon-arrow-right-short.svg'

import './styles.scss'

export function CardLink ({ href, onClick, className, children, ...props }) {
  return (
    <a tabIndex='0' href={href || null} onClick={onClick || null} className={`card-link ${className || ''}`} {...props}>
      <div className='card-link-text'>{children}</div>
      <span className='card-link-icon'>
        <ArrowIcon />
      </span>
    </a>
  )
}

CardLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
}
