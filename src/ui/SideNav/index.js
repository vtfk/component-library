import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Icon } from '../Icon'
import { IconDropdownNav, IconDropdownNavItem } from '../IconDropdownNav'
import { Logo } from '../Logo'

import './styles.scss'

export function SideNav ({ items, title, useMini, children, ...props }) {
  // const navigate = useNavigate()

  function handleItemClick (item) {
    if (item.href) {
      window.location = item.href
    }
    if (item.onClick) {
      item.onClick(item)
    }
    if (item.to) {
      // navigate(item.to)
    }
  }

  return (
    <>
      {/* Navigation shown for screen width > 1000px */}
      <nav role='navigation' className='sidenav' {...props}>
        <div className='brand'>
          <div className='brand-logo'>
            <Link to='/' aria-label='Hjem'>
              <Logo />
            </Link>
          </div>
          <div className='brand-name'>
            {title}
          </div>
        </div>
        <div className='sidenav-list-wrapper'>
          <ul className='sidenav-list'>
            {
              !!children && children
            }

            {
              items && items.map((item, index) => {
                const onClick = item.onClick

                return (
                  <React.Fragment key={index}>
                    {
                      item.icon
                        ? <SideNavItem href={item.href} to={item.to} icon={<Icon name={item.icon.name} size={item.icon.size || 'medium'} />} title={item.title} onClick={onClick} />
                        : <SideNavItem href={item.href} to={item.to} title={item.title} onClick={onClick} />
                    }
                  </React.Fragment>
                )
              })
            }
          </ul>
        </div>
      </nav>

      {/* Navigation shown for screen width <= 1000px */}
      {
        useMini &&
          <nav role='navigation' className='sidenav-mini'>
            <a href='/' className='brand'>
              <div className='brand-logo' aria-hidden>
                <Logo />
              </div>
              <div className='brand-name'>{title}</div>
            </a>
            <IconDropdownNav>
              {
                !!children && children
              }

              {
                items && items.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {
                        item.icon
                          ? <IconDropdownNavItem icon={<Icon name={item.icon.name} size={item.icon.size || 'small'} />} closeOnClick title={item.title} onClick={() => handleItemClick(item)} />
                          : <IconDropdownNavItem closeOnClick title={item.title} onClick={() => handleItemClick(item)} />
                      }
                    </React.Fragment>
                  )
                })
              }
            </IconDropdownNav>
          </nav>
      }
    </>
  )
}

export function SideNavItem ({ href, to, icon, title, onClick, ...props }) {
  const resolvedPath = useResolvedPath(to || '')
  const isActive = useMatch({ path: resolvedPath.pathname })

  const LinkContent = () => {
    return (
      <>
        <div className='sidenav-item-icon'>
          {icon}
        </div>
        <div className='sidenav-item-text'>{title}</div>
      </>
    )
  }

  return (
    <li className={`sidenav-item ${to && isActive ? 'active' : ''}`} {...props}>
      {
        href &&
          <a href={href}>
            <LinkContent />
          </a>
      }
      {
        to &&
          <Link to={to}>
            <LinkContent />
          </Link>
      }
      {
        onClick &&
          <span className='sidenav-item-onclick' onClick={onClick}>
            <LinkContent />
          </span>
      }
    </li>
  )
}

SideNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  items: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    icon: PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.string
    }),
    onClick: PropTypes.func,
    title: PropTypes.string
  })),
  title: PropTypes.string.isRequired,
  useMini: PropTypes.bool
}

SideNavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  to: PropTypes.string
}

SideNav.defaultProps = {
  useMini: false
}
