import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { CardLink } from '../CardLink'
import { Heading1, Heading3, Paragraph } from '../Typography'
import { Skeleton } from '../../index'

import './styles.scss'

export function StatisticsCard ({ className, noStyle, size, title, value, onClick, children, loading, maxWidth, style, ...props }) {
  const parsedStyle = useMemo(() => {
    const _style = style || {}
    if (maxWidth) _style.maxWidth = maxWidth
    return _style
  })

  if (onClick !== undefined) {
    return (
      <CardLink className={noStyle ? className || '' : `statistics-card ${className || ''}`} onClick={onClick} style={parsedStyle} {...props}>
        <div className='statistics-card-header'>
          {
          loading
            ? <Skeleton style={{ height: '50px' }} />
            : <Heading1 as='p' className='statistics-card-title'>{children || value}</Heading1>
        }
        </div>
        {
          size === 'small'
            ? <Paragraph className='statistics-card-text'>{title}</Paragraph>
            : <Heading3 as='p' className='statistics-card-text'>{title}</Heading3>
        }
      </CardLink>
    )
  }

  return (
    <div className={noStyle ? className || '' : `statistics-card ${className || ''}`} style={parsedStyle}>
      <div className='statistics-card-header'>
        {
          loading
            ? <Skeleton style={{ height: '50px' }} />
            : <Heading1 as='p' className='statistics-card-title'>{children || value}</Heading1>
        }
      </div>
      {
        size === 'small'
          ? <Paragraph className='statistics-card-text'>{title}</Paragraph>
          : <Heading3 as='p' className='statistics-card-text'>{title}</Heading3>
      }
    </div>
  )
}

export function StatisticsGroup ({ className, type, ...props }) {
  return (
    <div className={`${type === 'card' ? 'statistics-card-group' : 'statistics-progressbar-group'} ${className || ''}`}>
      {
        type === 'card' && props.children
      }
      {
        type === 'progress' &&
          <table>
            <tbody>
              {props.children}
            </tbody>
          </table>
      }
    </div>
  )
}

export function StatisticsProgressBar ({ className, name, value, maxValue }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
      <td className='statistics-progressbar'>
        <div
          className={`statistics-progressbar-container ${className || ''}`}
          style={{ maxWidth: (100 * parseInt(value) / maxValue) + '%' }}
        />
      </td>
    </tr>
  )
}

StatisticsCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  loading: PropTypes.bool,
  maxWidth: PropTypes.string,
  noStyle: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'large',
    'small'
  ]),
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  value: PropTypes.number
}

StatisticsCard.defaultProps = {
  noStyle: false,
  maxWidth: '400px',
  size: 'small'
}

StatisticsGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'card',
    'progress'
  ])
}

StatisticsGroup.defaultProps = {
  type: 'card'
}

StatisticsProgressBar.propTypes = {
  className: PropTypes.string,
  maxValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}
