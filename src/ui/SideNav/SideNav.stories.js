import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SideNav, SideNavItem } from '.'
import { Icon } from '../Icon'

export default getConfig(
  { title: 'SideNav', component: SideNav }
)

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
