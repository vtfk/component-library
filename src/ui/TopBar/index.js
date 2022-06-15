import React from 'react'
import PropTypes from 'prop-types'

import { IconDropdownNav, IconDropdownNavItem } from '../IconDropdownNav'
import { InitialsBadge } from '../InitialsBadge'
import { Paragraph } from '../Typography'

import './styles.scss'

export function TopBar ({ includeUserInfo, firstName, lastName, displayName, items, children }) {
  return (
    <div className='top-bar'>
      {
        children && <div className='top-bar-left'>{children}</div>
      }
      <div className='top-bar-user'>
        {
          includeUserInfo &&
            <>
              <InitialsBadge className='user-image' firstName={firstName} lastName={lastName} />
              <div className='user-name'>
                <Paragraph>{displayName}</Paragraph>
              </div>
            </>
        }
        <div className='user-menu'>
          {
            items.length > 0 &&
              <IconDropdownNav>
                {
                  items.map((item, index) => {
                    console.log('CloseOnClick on', item.title, item.closeOnClick)
                    return <IconDropdownNavItem key={index} onClick={() => item.onClick()} title={item.title} closeOnClick={item.closeOnClick} />
                  })
                }
              </IconDropdownNav>
          }
        </div>
      </div>
    </div>
  )
}

TopBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  displayName: PropTypes.string,
  firstName: PropTypes.string,
  includeUserInfo: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    closeOnClick: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  })),
  lastName: PropTypes.string
}

TopBar.defaultProps = {
  includeUserInfo: true,
  items: []
}
