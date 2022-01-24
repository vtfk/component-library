import React from 'react'
import { render, screen } from '@testing-library/react'

import { StatisticsCard, StatisticsGroup, StatisticsProgressBar } from '.'

describe('StatisticsCard', () => {
  test('loads and displays a StatisticsCard', () => {
    render(<StatisticsCard title='card'>StatisticsCard</StatisticsCard>)
    expect(screen.getByRole('heading')).toHaveTextContent('StatisticsCard')
  })
})

describe('StatisticsProgressBar', () => {
  test('loads and displays a StatisticsProgressBar', () => {
    render(<StatisticsGroup type='progress'><StatisticsProgressBar name='StatisticsProgressBar' value={50} maxValue={100} /></StatisticsGroup>)
    expect(screen.getByText('StatisticsProgressBar')).toHaveTextContent('StatisticsProgressBar')
  })
})

describe('StatisticsGroup', () => {
  test('loads and displays a StatisticsGroup', () => {
    render(<StatisticsGroup><span>StatisticsGroup</span></StatisticsGroup>)
    expect(screen.getByText('StatisticsGroup')).toHaveTextContent('StatisticsGroup')
  })
})
