import React from 'react'
import PropTypes from 'prop-types'

import { CardLink } from '../CardLink'
import { Heading1, Heading3, Paragraph } from '../Typography'

import './styles.scss'

export function StatisticsCard ({ className, noStyle, size, title, onClick, ...props }) {
  if (onClick !== undefined) {
    return (
      <CardLink className={noStyle ? className || '' : `statistics-card ${className || ''}`} onClick={onClick}>
        <Heading1 as='p' className='statistics-card-title'>
          {props.children}
        </Heading1>
        {
          size === 'small'
            ? <Paragraph className='statistics-card-text'>{title}</Paragraph>
            : <Heading3 as='p' className='statistics-card-text'>{title}</Heading3>
        }
      </CardLink>
    )
  }

  return (
    <div className={noStyle ? className || '' : `statistics-card ${className || ''}`}>
      <Heading1 as='p' className='statistics-card-title'>
        {props.children}
      </Heading1>
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
  ]).isRequired,
  className: PropTypes.string,
  noStyle: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([
    'large',
    'small'
  ]),
  title: PropTypes.string.isRequired
}

StatisticsCard.defaultProps = {
  noStyle: false,
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
