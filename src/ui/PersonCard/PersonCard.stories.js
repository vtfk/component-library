import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { PersonCard } from '.'

import { Paragraph, Link } from '../Typography'
import { InitialsBadge } from '../InitialsBadge'
import { Skeleton } from '../Skeleton'

export default getConfig(
  { title: 'PersonCard', component: PersonCard }
)

export function Basic () {
  return (
    <PersonCard firstName='Per' lastName='Hansen'>
      { /* Pass relevant content  */ }
      <Paragraph>
        Skolenavn
      </Paragraph>
      <Paragraph>
        <Link href={'https://link.com'}>Klassekode</Link>
      </Paragraph>
      <Paragraph>
        epost@epost.com
      </Paragraph>
      { /* END: Pass relevant content  */ }
    </PersonCard>
  )
}

export function LargeName () {
  return (
    <PersonCard firstName='Åsmund' lastName='Olsen' largeName={true}>
      { /* Pass relevant content  */ }
      <Paragraph>
        Skolenavn
      </Paragraph>
      <Paragraph>
        <Link href={'https://link.com'}>Klassekode</Link>
      </Paragraph>
      { /* END: Pass relevant content  */ }
    </PersonCard>
  )
}

export function Loading () {
  const loading = true

  return (
    <PersonCard loading={true} firstName='Per' lastName='Hansen'>
      { /* Pass relevant content  */ }
      <Paragraph>
        {loading ? <Skeleton width='200px' /> : 'Skolenavn'}
      </Paragraph>
      <Paragraph>
        {loading ? <Skeleton width='180px' /> : <Link href={'https://link.com'}>Klassekode</Link>}
      </Paragraph>
      <Paragraph>
        {loading ? <Skeleton width='180px' /> : 'epost@epost.com'}
      </Paragraph>
      { /* END: Pass relevant content  */ }
    </PersonCard>
  )
}
