import React from 'react'
import PropTypes from 'prop-types'

import { IconDropdownNav } from '../IconDropdownNav'
import { InitialsBadge } from '../InitialsBadge'
import { Paragraph } from '../Typography'

import './styles.scss'

const isIconDropdownNavItem = (props, propName, componentName) => {
  let error
  props.children && props.children.forEach((child, index) => {
    if (child.type.name !== 'IconDropdownNavItem') {
      error = new Error(`Invalid React element passed as child ${index + 1}. Expected "IconDropdownNavItem"`)
    }
  })

  if (error) return error
}

export function TopBar ({ includeUserInfo, firstName, lastName, displayName, children }) {
  return (
    <div className='top-bar'>
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
          <IconDropdownNav>
            {children}
          </IconDropdownNav>
        </div>
      </div>
    </div>
  )
}

TopBar.propTypes = {
  children: isIconDropdownNavItem,
  displayName: PropTypes.string,
  firstName: PropTypes.string,
  includeUserInfo: PropTypes.bool,
  lastName: PropTypes.string
}

TopBar.defaultProps = {
  includeUserInfo: true
}
