import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, object } from '@storybook/addon-knobs'

import { SideNav, SideNavItem } from '.'
import { Icon } from '../Icon'

export default getConfig({
  title: 'SideNav',
  component: SideNav,
  decorators: [withKnobs],
  subcomponents: {
    SideNavItem
  }
})

const menu = [
  {
    href: 'https://vtfk.no',
    icon: {
      name: 'home'
    },
    title: 'Link 1'
  },
  {
    href: 'https://vtfk.no',
    icon: {
      name: 'students'
    },
    title: 'Link 2'
  },
  {
    href: 'https://vtfk.no',
    icon: {
      name: 'classes'
    },
    title: 'Link 3'
  },
  {
    onClick: () => console.log('Link 4'),
    icon: {
      name: 'classes'
    },
    title: 'Link 4'
  }
]

export function Basic () {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize (event) {
      setWidth(event.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <SideNav title='SideNav'>
        <SideNavItem href='https://vtfk.no' icon={<Icon name='home' size='medium' />} title='Link 1' active />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='students' size='medium' />} title='Link 2' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='medium' />} title='Link 3' />
        <SideNavItem icon={<Icon name='classes' size='medium' />} title='Link 4' onClick={() => console.log('Link 4 clicked')} />
      </SideNav>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNav</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk.</span><br /><br />
        <span><strong>innerWidth</strong>: {width}px</span>
      </div>
    </>
  )
}

export function Both () {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize (event) {
      setWidth(event.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <SideNav title='SideNav' useMini>
        <SideNavItem href='https://vtfk.no' icon={<Icon name='home' size='medium' />} title='Link 1' active />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='students' size='medium' />} title='Link 2' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='medium' />} title='Link 3' />
        <SideNavItem icon={<Icon name='classes' size='medium' />} title='Link 4' onClick={() => console.log('Link 4 clicked')} />
      </SideNav>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNav</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk.</span><br /><br />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNavMini</strong> vil være synlig når <i>innerWidth</i> er mindre enn eller lik <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1001px</strong> eller over skjules den automatisk.</span><br /><br />
        <span><strong>innerWidth</strong>: {width}px</span>
      </div>
    </>
  )
}

export function MenuItems () {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize (event) {
      setWidth(event.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <>
      <SideNav title='SideNav' items={object('Menu items', menu)} useMini />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNav</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk.</span><br /><br />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNavMini</strong> vil være synlig når <i>innerWidth</i> er mindre enn eller lik <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1001px</strong> eller over skjules den automatisk.</span><br /><br />
        <span><strong>innerWidth</strong>: {width}px</span>
      </div>
    </>
  )
}
