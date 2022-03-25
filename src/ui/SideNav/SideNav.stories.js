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

const menuScroll = [
  ...menu,
  {
    onClick: () => console.log('Link 5'),
    icon: {
      name: 'classes'
    },
    title: 'Link 5'
  },
  {
    onClick: () => console.log('Link 6'),
    icon: {
      name: 'classes'
    },
    title: 'Link 6'
  },
  {
    onClick: () => console.log('Link 7'),
    icon: {
      name: 'classes'
    },
    title: 'Link 7'
  },
  {
    onClick: () => console.log('Link 8'),
    icon: {
      name: 'classes'
    },
    title: 'Link 8'
  },
  {
    onClick: () => console.log('Link 9'),
    icon: {
      name: 'classes'
    },
    title: 'Link 9'
  },
  {
    onClick: () => console.log('Link 10'),
    icon: {
      name: 'classes'
    },
    title: 'Link 10'
  },
  {
    onClick: () => console.log('Link 11'),
    icon: {
      name: 'classes'
    },
    title: 'Link 11'
  },
  {
    onClick: () => console.log('Link 12'),
    icon: {
      name: 'classes'
    },
    title: 'Link 12'
  },
  {
    onClick: () => console.log('Link 13'),
    icon: {
      name: 'classes'
    },
    title: 'Link 13'
  },
  {
    onClick: () => console.log('Link 14'),
    icon: {
      name: 'classes'
    },
    title: 'Link 14'
  },
  {
    onClick: () => console.log('Link 15'),
    icon: {
      name: 'classes'
    },
    title: 'Link 15'
  },
  {
    onClick: () => console.log('Link 16'),
    icon: {
      name: 'classes'
    },
    title: 'Link 16'
  },
  {
    onClick: () => console.log('Link 17'),
    icon: {
      name: 'classes'
    },
    title: 'Link 17'
  },
  {
    onClick: () => console.log('Link 18'),
    icon: {
      name: 'classes'
    },
    title: 'Link 18'
  },
  {
    onClick: () => console.log('Link 19'),
    icon: {
      name: 'classes'
    },
    title: 'Link 19'
  },
  {
    onClick: () => console.log('Link 20'),
    icon: {
      name: 'classes'
    },
    title: 'Link 20'
  },
  {
    onClick: () => console.log('Link 21'),
    icon: {
      name: 'classes'
    },
    title: 'Link 21'
  },
  {
    onClick: () => console.log('Link 22'),
    icon: {
      name: 'classes'
    },
    title: 'Link 22'
  },
  {
    onClick: () => console.log('Link 23'),
    icon: {
      name: 'classes'
    },
    title: 'Link 23'
  },
  {
    onClick: () => console.log('Link 24'),
    icon: {
      name: 'classes'
    },
    title: 'Link 24'
  },
  {
    onClick: () => console.log('Link 25'),
    icon: {
      name: 'classes'
    },
    title: 'Link 25'
  },
  {
    onClick: () => console.log('Link 26'),
    icon: {
      name: 'classes'
    },
    title: 'Link 26'
  },
  {
    onClick: () => console.log('Link 27'),
    icon: {
      name: 'classes'
    },
    title: 'Link 27'
  },
  {
    onClick: () => console.log('Link 28'),
    icon: {
      name: 'classes'
    },
    title: 'Link 28'
  },
  {
    onClick: () => console.log('Link 29'),
    icon: {
      name: 'classes'
    },
    title: 'Link 29'
  },
  {
    onClick: () => console.log('Link 30'),
    icon: {
      name: 'classes'
    },
    title: 'Link 30'
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

export function MenuItemsWithScroll () {
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
      <SideNav title='SideNav' items={object('Menu items', menuScroll)} useMini />
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
