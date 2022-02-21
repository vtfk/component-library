import React, { useRef, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as DropdownNavIcon } from './icon-dropdown-nav-icon.svg'

import './styles.scss'

const IconDropdownNavContext = React.createContext()

export function IconDropdownNav ({ placement, ...props }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keyup', handleKeyPress)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [])

  function toggleDropdown () {
    setDropdownOpen(prevDropdownOpen => !prevDropdownOpen)
  }

  function handleClickOutside (event) {
    if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (event.target.className !== 'icon-dropdown-nav-trigger') {
        toggleDropdown()
      }
    }
  }

  function handleKeyPress (event) {
    if (event.key === 'Escape') {
      setDropdownOpen(false)
    }
  }

  return (
    <div className='icon-dropdown-nav' {...props}>
      <button className='icon-dropdown-nav-trigger' onClick={() => { toggleDropdown() }}>
        <DropdownNavIcon aria-label='Åpne dropdown meny' />
      </button>

      {
        dropdownOpen === true &&
          <div className={`icon-dropdown-nav-dropdown ${placement}`} ref={dropdownRef}>
            <ul>
              <IconDropdownNavContext.Provider value={{ closeNav: () => { setDropdownOpen(false) } }}>
                {props.children}
              </IconDropdownNavContext.Provider>
            </ul>
          </div>
      }
    </div>
  )
}

export function IconDropdownNavItem ({ href, onClick, title, closeOnClick, closeNav, ...props }) {
  const context = useContext(IconDropdownNavContext)

  function handleOnClick () {
    if (closeOnClick && context.closeNav) {
      onClick()
      context.closeNav()
    } else {
      onClick()
    }
  }

  return (
    <li className='icon-dropdown-nav-item' {...props}>
      {
        href &&
          <a href={href}>
            {title}
          </a>
      }

      {
        onClick &&
          <button onClick={() => { handleOnClick() }}>
            {title}
          </button>
      }
    </li>
  )
}

IconDropdownNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  placement: PropTypes.oneOf([
    'left-bottom',
    'left-top',
    'right-bottom',
    'right-top'
  ])
}

IconDropdownNav.defaultProps = {
  placement: 'left-bottom'
}

IconDropdownNavItem.propTypes = {
  closeNav: PropTypes.func,
  closeOnClick: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired
}
