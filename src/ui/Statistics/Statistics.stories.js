import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, select } from '@storybook/addon-knobs'

import { StatisticsCard, StatisticsGroup, StatisticsProgressBar } from '.'

const apples = 15

const cardSize = [
  'large',
  'small'
]

export default getConfig({
  title: 'Statistics',
  component: StatisticsCard,
  decorators: [withKnobs],
  subcomponents: {
    StatisticsGroup,
    StatisticsProgressBar
  }
})

export function Basic () {
  return (
    <div>
      <div>
        One single <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is how many apples i have' size={select('Size', cardSize, 'small')}>
            {
              apples
            }
          </StatisticsCard>
        </StatisticsGroup>
      </div>
      <div>
        Two <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is half of my apples' size={select('Size', cardSize, 'small')}>
            {
              apples / 2
            }
          </StatisticsCard>
          <StatisticsCard title='Is a third of my apples' size={select('Size', cardSize, 'small')}>
            {
              apples / 3
            }
          </StatisticsCard>
        </StatisticsGroup>
      </div>
    </div>
  )
}

export function CardLink () {
  return (
    <div>
      <div>
        One single <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is how many apples i have' size={select('Size', cardSize, 'small')} onClick={() => console.log('I have', apples, 'apples')}>
            {
              apples
            }
          </StatisticsCard>
        </StatisticsGroup>
      </div>
      <div>
        Two <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is half of my apples' size={select('Size', cardSize, 'small')} onClick={() => console.log('Half of my apples is', apples / 2)}>
            {
              apples / 2
            }
          </StatisticsCard>
          <StatisticsCard title='Is a third of my apples' size={select('Size', cardSize, 'small')} onClick={() => console.log('Third of my apples is', apples / 3)}>
            {
              apples / 3
            }
          </StatisticsCard>
        </StatisticsGroup>
      </div>
    </div>
  )
}

export function Progress () {
  return (
    <div>
      <h2>Four <b>StatisticsProgress</b> in a <b>StatisticsGroup</b></h2>
      <StatisticsGroup type='progress'>
        <StatisticsProgressBar name='How many apples do i have?' value={100} maxValue={100} />
        <StatisticsProgressBar name='How many apples is half?' value={50} maxValue={100} />
        <StatisticsProgressBar name='How many apples is a third?' value={33} maxValue={100} />
        <StatisticsProgressBar name='How many apples is 1?' value={1} maxValue={100} />
      </StatisticsGroup>
    </div>
  )
}
