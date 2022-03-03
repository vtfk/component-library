import React from 'react'
import PropTypes from 'prop-types'

import { IconDropdownNav, IconDropdownNavItem } from '../IconDropdownNav'
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

export function SideNavMiniItem ({ href, title, onClick }) {
  return (
    <>
      {
        href &&
          <IconDropdownNavItem closeOnClick href={href} title={title} />
      }

      {
        onClick &&
          <IconDropdownNavItem closeOnClick title={title} onClick={() => onClick()} />
      }
    </>
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

SideNavMiniItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
}
