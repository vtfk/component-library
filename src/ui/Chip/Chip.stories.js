import React from 'react'
import PropTypes from 'prop-types'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, select } from '@storybook/addon-knobs'

import { Chip, types } from '.'
import { Icon } from '../Icon'

export default getConfig({
  title: 'Chip',
  component: Chip,
  decorators: [withKnobs]
})

function Table ({ chips }) {
  return (
    <table style={{ border: '1px solid grey' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid grey' }}>Navn</th>
          <th style={{ border: '1px solid grey' }}>Alder</th>
        </tr>
      </thead>
      <tbody>
        {
          chips && Array.isArray(chips) && chips.map((chip, index) => {
            return (
              <tr key={index}>
                <td style={{ border: '1px solid grey' }}>Turid Laila {chip}</td>
                <td style={{ border: '1px solid grey' }}>168</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export function Information () {
  return (
    <Table chips={[
      <Chip
        key='1'
        message='information'
        type='information'
      />,
      <Chip
        key='2'
        icon={<Icon name='check' size='small' />}
        message='information'
        type='information'
      />
    ]}
    />
  )
}

export function Success () {
  return (
    <Table chips={[
      <Chip
        key='1'
        message='success'
        type='success'
      />
    ]}
    />
  )
}

export function Warning () {
  return (
    <Table chips={[
      <Chip
        key='1'
        message='warning'
        type='warning'
      />,
      <Chip
        key='2'
        icon={<Icon name='warning' size='small' />}
        message='warning'
        type='warning'
      />
    ]}
    />
  )
}

export function Error () {
  return (
    <Table chips={[
      <Chip
        key='1'
        message='error'
        type='error'
      />,
      <Chip
        key='2'
        icon={<Icon name='error' size='small' />}
        message='error'
        type='error'
      />
    ]}
    />
  )
}

export function Styles () {
  return (
    <div>
      <h1>style</h1>
      <Table chips={[
        <Chip
          key='1'
          message='no style'
          type={select('type', types, 'information')}
        />,
        <Chip
          key='2'
          message='bold'
          style='bold'
          type={select('type', types, 'information')}
        />,
        <Chip
          key='3'
          message="['bold', 'italic']"
          style={['bold', 'italic']}
          type={select('type', types, 'information')}
        />,
        <Chip
          key='4'
          message="['bold', 'uppercase', 'underline']"
          style={['bold', 'uppercase', 'underline']}
          type={select('type', types, 'information')}
        />
      ]}
      />

      <h1>fontSize</h1>
      <Table chips={[
        <Chip
          key='1'
          message='default (0.8rem)'
          type={select('type', types, 'information')}
        />,
        <Chip
          key='2'
          fontSize='2rem'
          message='2rem'
          type={select('type', types, 'information')}
        />,
        <Chip
          key='3'
          fontSize='16px'
          message='16px'
          type={select('type', types, 'information')}
        />,
        <Chip
          key='4'
          fontSize='200%'
          message='200%'
          type={select('type', types, 'information')}
        />
      ]}
      />
    </div>
  )
}

Table.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.object)
}
