import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SideNav, SideNavItem, SideNavMini } from '.'
import { Icon } from '../Icon'
import { IconDropdownNavItem } from '../IconDropdownNav'

export default getConfig({
  title: 'SideNav',
  component: SideNav,
  subcomponents: {
    SideNavItem,
    SideNavMini
  }
})

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
        <SideNavItem href='https://vtfk.no' icon={<Icon name='home' size='small' />} title='Link 1' active />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='students' size='small' />} title='Link 2' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='small' />} title='Link 3' />
      </SideNav>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNav</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk</span>
        <span><strong>innerWidth</strong>: {width}px</span><br /><br />
      </div>
    </>
  )
}

export function Mini () {
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
      <SideNavMini title='SideNavMini'>
        <IconDropdownNavItem closeOnClick title='Link 1' onClick={() => console.log('Link 1 clicked')} />
        <IconDropdownNavItem closeOnClick title='Link 2' onClick={() => console.log('Link 2 clicked')} />
        <IconDropdownNavItem closeOnClick title='Link 3' href='/' />
      </SideNavMini>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNavMini</strong> vil være synlig når <i>innerWidth</i> er mindre enn eller lik <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1001px</strong> eller over skjules den automatisk</span>
        <span><strong>innerWidth</strong>: {width}px</span><br /><br />
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
      <SideNav title='SideNav'>
        <SideNavItem href='https://vtfk.no' icon={<Icon name='home' size='small' />} title='Link 1' active />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='students' size='small' />} title='Link 2' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='small' />} title='Link 3' />
      </SideNav>
      <SideNavMini title='SideNavMini'>
        <IconDropdownNavItem closeOnClick title='Link 1' onClick={() => console.log('Link 1 clicked')} />
        <IconDropdownNavItem closeOnClick title='Link 2' onClick={() => console.log('Link 2 clicked')} />
        <IconDropdownNavItem closeOnClick title='Link 3' href='/' />
      </SideNavMini>
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
