import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { StatisticsCard, StatisticsGroup, StatisticsProgressBar } from '.'

const apples = 15

export default getConfig({
  title: 'Statistics',
  component: StatisticsCard,
  subcomponents: {
    StatisticsGroup,
    StatisticsProgressBar
  }
})

export function Basic () {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>One single <b>StatisticsCard</b> in a <b>StatisticsGroup</b></td>
          </tr>
          <tr>
            <td>
              <StatisticsGroup type='card'>
                <StatisticsCard title='Is how many apples i have'>
                  {
                    apples
                  }
                </StatisticsCard>
              </StatisticsGroup>
            </td>
          </tr>
          <tr>
            <td>Two <b>StatisticsCard</b> in a <b>StatisticsGroup</b></td>
          </tr>
          <tr>
            <td>
              <StatisticsGroup type='card'>
                <StatisticsCard title='Is half of my apples'>
                  {
                    apples / 2
                  }
                </StatisticsCard>
                <StatisticsCard title='Is a third of my apples'>
                  {
                    apples / 3
                  }
                </StatisticsCard>
              </StatisticsGroup>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function Progress () {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><h2>Four <b>StatisticsProgress</b> in a <b>StatisticsGroup</b></h2></td>
          </tr>
          <tr>
            <td>
              <StatisticsGroup type='progress'>
                <StatisticsProgressBar name='How many apples do i have?' value={100} maxValue={100} />
                <StatisticsProgressBar name='How many apples is half?' value={50} maxValue={100} />
                <StatisticsProgressBar name='How many apples is a third?' value={33} maxValue={100} />
                <StatisticsProgressBar name='How many apples is 1?' value={1} maxValue={100} />
              </StatisticsGroup>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
