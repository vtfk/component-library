import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SkeletonLoader } from '.'

export default getConfig(
  { title: 'SkeletonLoader', component: SkeletonLoader }
)

export function Text() {
  return (
    <SkeletonLoader variant="text" />
  )
}

export function Circle() {
  return (
    <SkeletonLoader variant="circle" width={100} height={100} />
  )
}

export function Rectangle() {
  return (
    <SkeletonLoader variant="rectangle" height={100} />
  )
}

export function RandomWidth() {
  return (
    <div>
      <SkeletonLoader randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
      <SkeletonLoader randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
      <SkeletonLoader randomWidth={[30, 80]} style={{ marginBottom: 10 }} />
    </div>
  )
}
