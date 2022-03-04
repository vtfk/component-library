import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../Icon'
import { IconDropdownNav } from '../IconDropdownNav'
import { Logo } from '../Logo'

import './styles.scss'

export function SideNav ({ items, title, ...props }) {
  function handleItemClick (item) {
    if (item.href) {
      window.location = item.href
    }
    if (item.onClick) {
      item.onClick()
    }
  }

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
            {
              !!props.children && props.children
            }

            {
              items && items.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      item.icon
                        ? <SideNavItem href={item.href} icon={<Icon name={item.icon.name} size={item.icon.size || 'small'} />} title={item.title} active={window.location.pathname === item.href} onClick={() => handleItemClick(item)} />
                        : <SideNavItem href={item.href} title={item.title} active={window.location.pathname === item.href} onClick={() => handleItemClick(item)} />
                    }
                  </React.Fragment>
                )
              })
            }
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
