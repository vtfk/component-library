import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'

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
      <div style={{marginTop: '2rem'}}>
        Two <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is half of my apples' size={select('Size', cardSize, 'small')}>
            {
              apples / 2
            }
          </StatisticsCard>
          <StatisticsCard title='Is a third of my apples' size={select('Size', cardSize, 'small')} value={apples / 3} />
        </StatisticsGroup>
      </div>
    </div>
  )
}

export function CardLink () {
  return (
    <div>
      <div>
        One <b><i>disabled</i></b> single <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is how many apples i have' size={select('Size', cardSize, 'small')} onClick={() => console.log('I have', apples, 'apples')} disabled>
            {
              apples
            }
          </StatisticsCard>
        </StatisticsGroup>
      </div>
      <div style={{marginTop: '2rem'}}>
        Two <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='Is half of my apples' size={select('Size', cardSize, 'small')} onClick={() => console.log('Half of my apples is', apples / 2)}>
            {
              apples / 2
            }
          </StatisticsCard>
          <StatisticsCard title='Is a third of my apples' size={select('Size', cardSize, 'small')} onClick={() => console.log('Third of my apples is', apples / 3)} value={apples / 3} />
        </StatisticsGroup>
      </div>
      <div style={{marginTop: '2rem'}}>
        Four <b>StatisticsCard</b> in a <b>StatisticsGroup</b><br />
        <StatisticsGroup type='card'>
          <StatisticsCard title='All' size={select('Size', cardSize, 'small')} onClick={() => console.log('All of my apples is', apples)} value={apples} />
          <StatisticsCard title='Half' size={select('Size', cardSize, 'small')} onClick={() => console.log('Half of my apples is', apples / 2)} value={apples / 2} />
          <StatisticsCard title='Third' size={select('Size', cardSize, 'small')} onClick={() => console.log('Third of my apples is', apples / 3)} value={apples / 3} />
          <StatisticsCard title='Fourth' size={select('Size', cardSize, 'small')} onClick={() => console.log('Fourth of my apples is', apples / 4)} value={apples / 4} />
        </StatisticsGroup>
      </div>
    </div>
  )
}

export function Mixed () {
  return(
    <>
    <div style={{marginTop: '2rem'}}>
      A mix of <b>StatisticsCard</b> and <b>CardLink</b><br />
      <StatisticsGroup>
        <StatisticsCard title='All' size={select('Size', cardSize, 'small')} onClick={() => console.log('All of my apples is', apples)} value={apples} />
        <StatisticsCard title='Half' size={select('Size', cardSize, 'small')} value={apples / 2} />
        <StatisticsCard title='Third' size={select('Size', cardSize, 'small')} onClick={() => console.log('Third of my apples is', apples / 3)} value={apples / 3} />
        <StatisticsCard title='Fourth' size={select('Size', cardSize, 'small')} value={apples / 3} />
      </StatisticsGroup>
    </div>
    <div style={{marginTop: '2rem'}}>
      These two are <b>Loading</b><br />
      <StatisticsGroup>
        <StatisticsCard title='Half' size={select('Size', cardSize, 'small')} loading={boolean('Loading', true)} value={apples / 2} />
        <StatisticsCard title='Third' size={select('Size', cardSize, 'small')} loading={boolean('Loading', true)} onClick={() => console.log('Third of my apples is', apples / 3)} value={apples / 3} />
      </StatisticsGroup>
    </div>
    <div style={{marginTop: '2rem'}}>
      These has different <b>maxWidth</b><br />
      <StatisticsGroup>
      <StatisticsCard title='All' size={select('Size', cardSize, 'small')} onClick={() => console.log('All of my apples is', apples)} value={apples} maxWidth="200px" />
        <StatisticsCard title='Half' size={select('Size', cardSize, 'small')} value={apples / 2} maxWidth="400px" />
        <StatisticsCard title='Third' size={select('Size', cardSize, 'small')} onClick={() => console.log('Third of my apples is', apples / 3)} value={apples / 3} maxWidth="500px" />
        <StatisticsCard title='Fourth' size={select('Size', cardSize, 'small')} value={apples / 3} maxWidth="300px"/>
      </StatisticsGroup>
    </div>
    </>
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
