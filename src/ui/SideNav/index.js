import React from 'react'
import PropTypes from 'prop-types'

import { IconDropdownNav } from '../IconDropdownNav'
import { Logo } from '../Logo'

import './styles.scss'

export function SideNav ({ title, ...props }) {
  return (
    <>
      {/* Navigation shown for screen width > 1000px */}
      <nav role='navigation' className='sidenav' {...props}>
        <div className='brand'>
          <div className='brand-logo'>
            <a href='/' aria-label='Hjem'>
              <Logo />
            </a>
          </div>
          <div className='brand-name'>
            {title}
          </div>
        </div>
        <div className='sidenav-list-wrapper'>
          <ul className='sidenav-list'>
            {props.children}
          </ul>
        </div>
      </nav>
    </>
  )
}

export function SideNavMini ({ title, ...props }) {
  return (
    <>
      {/* Navigation shown for screen width <= 1000px */}
      <nav role='navigation' className='sidenav-mini'>
        <a href='/' className='brand'>
          <div className='brand-logo' aria-hidden>
            <Logo />
          </div>
          <div className='brand-name'>{title}</div>
        </a>
        <IconDropdownNav>
          {props.children}
        </IconDropdownNav>
      </nav>
    </>
  )
}

export function SideNavItem ({ href, icon, title, active, ...props }) {
  return (
    <li className={`sidenav-item ${active === true ? 'active' : ''}`} {...props}>
      <a href={href}>
        <div className='sidenav-item-icon'>
          {icon}
        </div>
        <div className='sidenav-item-text'>{title}</div>
      </a>
    </li>
  )
}

SideNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
}

SideNavMini.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired
}

SideNavItem.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}
