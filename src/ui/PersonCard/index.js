import React from 'react'
import PropTypes from 'prop-types'

import { Heading2, Heading3 } from '../Typography'
import { InitialsBadge } from '../InitialsBadge'
import { Skeleton } from '../Skeleton'

import './styles.scss'

export function PersonCard ({ loading, firstName, lastName, largeName, ...props }) {
  const NameHeading = largeName ? Heading2 : Heading3

  return (
    <div className='person-card'>
      <div className='image'>
        {
          loading
            ? <Skeleton variant='circle'><InitialsBadge size='large' /></Skeleton>
            : <InitialsBadge firstName={firstName} lastName={lastName} size='large' />
        }
      </div>
      <div className='text-wrapper'>
        <NameHeading className='name'>
          {
            loading
              ? <Skeleton randomWidth={[50, 100]} />
              : `${firstName || ''} ${lastName}`
          }
        </NameHeading>
        <div className='other'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

PersonCard.propTypes = {
  children: PropTypes.any,
  firstName: PropTypes.string.isRequired,
  largeName: PropTypes.bool,
  lastName: PropTypes.string.isRequired,
  loading: PropTypes.bool
}
