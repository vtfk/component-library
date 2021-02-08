import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
  Link,
  SkipLink,
  ErrorMessage
} from '.'

export default getConfig(
  { title: 'Typography', component: Heading1 }
)

export function Heading_1 () {
  return (
    <Heading1>Heading 1</Heading1>
  )
}

export function Heading_2 () {
  return (
    <Heading2>Heading 2</Heading2>
  )
}

export function Heading_3 () {
  return (
    <Heading3>Heading 3</Heading3>
  )
}

export function Heading_4 () {
  return (
    <Heading4>Heading 4</Heading4>
  )
}

export function Text () {
  return (
    <div>
      <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Paragraph>
      <Paragraph size='small'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Paragraph>
    </div>
  )
}

export function Text_link () {
  return (
    <div>
      <Link href='https://vtfk.no'>Link</Link>
      <br />
      <Link noStyle href='https://vtfk.no'>Link without style</Link>
      <br />
      <Link size='small' onClick={() => { console.log('onClick!') }}>Link</Link>
    </div>
  )
}

export function Skip_link () {
  return (
    <p>
      (Visible on tab)
      <br />
      <SkipLink href='https://vtfk.no'>Skip link</SkipLink>
    </p>
  )
}

export function Error_Message () {
  return (
    <ErrorMessage>Her er feilmeldingen</ErrorMessage>
  )
}
