import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function Heading1 ({ as, className, children, ...props }) {
  const CustomTag = as || 'h1'

  return (
    <CustomTag className={`typography heading-one ${className || ''}`} {...props}>
      {children}
    </CustomTag>
  )
}

export function Heading2 ({ as, className, children, ...props }) {
  const CustomTag = as || 'h2'

  return (
    <CustomTag className={`typography heading-two ${className || ''}`} {...props}>
      {children}
    </CustomTag>
  )
}

export function Heading3 ({ as, className, children, ...props }) {
  const CustomTag = as || 'h3'

  return (
    <CustomTag className={`typography heading-three ${className || ''}`} {...props}>
      {children}
    </CustomTag>
  )
}

export function Heading4 ({ as, className, children, ...props }) {
  const CustomTag = as || 'h4'

  return (
    <CustomTag className={`typography heading-four ${className || ''}`} {...props}>
      {children}
    </CustomTag>
  )
}

export function Paragraph ({ className, children, size, ...props }) {
  return (
    <p className={`typography paragraph ${className || ''} ${size || ''}`} {...props}>
      {children}
    </p>
  )
}

export function Link ({ href, onClick, className, noStyle, leftIcon, rightIcon, children, size, ...props }) {
  return (
    <>
      {
        href &&
          <a href={href} className={`typography link ${className || ''} ${noStyle ? 'no-style' : ''} ${size || ''} ${leftIcon || rightIcon ? 'has-icon' : ''}`} {...props}>
            {
              leftIcon &&
                <span className='link-icon left-icon'>{leftIcon}</span>
            }
            {children}
            {
              rightIcon &&
                <span className='link-icon right-icon'>{rightIcon}</span>
            }
          </a>
      }

      {
        onClick &&
          <button onClick={onClick} className={`typography link ${className || ''} ${noStyle ? 'no-style' : ''} ${size || ''} ${leftIcon || rightIcon ? 'has-icon' : ''}`} {...props}>
            {
              leftIcon &&
                <span className='link-icon left-icon'>{leftIcon}</span>
            }
            {children}
            {
              rightIcon &&
                <span className='link-icon right-icon'>{rightIcon}</span>
            }
          </button>
      }
    </>
  )
}

export function SkipLink ({ href, className, ...props }) {
  return (
    <Link href={href} className={`visually-hidden focusable skip-link ${className || ''}`} {...props} />
  )
}

export function ErrorMessage ({ className, children, size, ...props }) {
  return (
    <p className={`typography paragraph error ${className || ''} ${size || ''}`} role='alert' aria-live='assertive' {...props}>
      {children}
    </p>
  )
}

Heading1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Heading2.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Heading3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Heading4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  leftIcon: PropTypes.node,
  noStyle: PropTypes.bool,
  onClick: PropTypes.func,
  rightIcon: PropTypes.node,
  size: PropTypes.string
}

SkipLink.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string
}

ErrorMessage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.string
}
