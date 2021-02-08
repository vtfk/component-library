import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Skeleton } from '.'

export default getConfig(
  { title: 'Skeleton', component: Skeleton }
)

export function Text () {
  return (
    <Skeleton variant='text' />
  )
}

export function Circle () {
  return (
    <Skeleton variant='circle' width={100} height={100} />
  )
}

export function Rectangle () {
  return (
    <Skeleton variant='rectangle' height={100} />
  )
}

export function RandomWidth () {
  return (
    <div>
      <Skeleton randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
      <Skeleton randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
      <Skeleton randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
    </div>
  )
}
