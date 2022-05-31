import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

const createMenuItems = (scroll = false) => {
  const items = [
    {
      to: '/*',
      icon: {
        name: 'home'
      },
      title: 'Router link'
    },
    {
      href: window.parent.location.href,
      icon: {
        name: 'students'
      },
      title: 'Internal link'
    },
    {
      href: 'https://vtfk.no',
      icon: {
        name: 'classes'
      },
      title: 'External link'
    },
    {
      onClick: () => console.log('onClick'),
      icon: {
        name: 'classes'
      },
      title: 'onClick'
    }
  ]

  if (scroll) {
    for (let i = 0; i <= 28; i++) {
      const title = `onClick ${i + 2}`
      items.push({
        onClick: () => console.log(title),
        icon: {
          name: 'classes'
        },
        title
      })
    }
  }

  return items
}

// eslint-disable-next-line
const Description = ({ useMini = false }) => {
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ paddingBottom: '1em' }}><strong>SideNav</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</span>
        <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk.</span><br />
        <span><strong>innerWidth</strong>: {width}px</span>
      </div>
      {
        useMini &&
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4em' }}>
            <span style={{ paddingBottom: '1em' }}><strong>SideNavMini</strong> vil være synlig når <i>innerWidth</i> er mindre enn eller lik <strong>1000px</strong>.</span>
            <span style={{ paddingBottom: '1em' }}>Går <i>innerWidth</i> til <strong>1001px</strong> eller over skjules den automatisk.</span><br />
            <span><strong>innerWidth</strong>: {width}px</span>
          </div>
      }
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4em' }}>
        <span style={{ paddingBottom: '1em' }}><strong>Router link</strong> uses <i><u>Link</u></i> component from <i>react-router-dom</i> to only render main content (<strong>this</strong>)</span>
        <span style={{ paddingBottom: '1em' }}><strong>Internal link</strong> uses <i><u>a</u></i> tag and will rerender the whole page</span>
        <span style={{ paddingBottom: '1em' }}><strong>External link</strong> uses <i><u>a</u></i> tag and will navigate to an external page</span>
        <span style={{ paddingBottom: '1em' }}><strong>onClick</strong>(s) uses <i><u>onClick</u></i> handler and will do whatever you tell it to do 💪</span>
      </div>
    </>
  )
}

export function Basic () {
  return (
    <BrowserRouter>
      <SideNav title='SideNav'>
        <SideNavItem to='/*' icon={<Icon name='home' size='medium' />} title='Router link' />
        <SideNavItem href={window.parent.location.href} icon={<Icon name='students' size='medium' />} title='Internal link' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='medium' />} title='External link' />
        <SideNavItem icon={<Icon name='classes' size='medium' />} title='onClick' onClick={() => console.log('onClick')} />
      </SideNav>
      <Routes>
        <Route path='/*' element={<Description />} />
      </Routes>
    </BrowserRouter>
  )
}

export function Both () {
  return (
    <BrowserRouter>
      <SideNav title='SideNav' useMini>
        <SideNavItem to='/*' icon={<Icon name='home' size='medium' />} title='Router link' />
        <SideNavItem href={window.parent.location.href} icon={<Icon name='students' size='medium' />} title='Internal link' />
        <SideNavItem href='https://vtfk.no' icon={<Icon name='classes' size='medium' />} title='External link' />
        <SideNavItem icon={<Icon name='classes' size='medium' />} title='onClick' onClick={() => console.log('onClick')} />
      </SideNav>
      <Routes>
        <Route path='/*' element={<Description useMini />} />
      </Routes>
    </BrowserRouter>
  )
}

export function MenuItems () {
  return (
    <BrowserRouter>
      <SideNav title='SideNav' items={object('Menu items', createMenuItems())} useMini />
      <Routes>
        <Route path='/*' element={<Description useMini />} />
      </Routes>
    </BrowserRouter>
  )
}

export function MenuItemsWithScroll () {
  return (
    <BrowserRouter>
      <SideNav title='SideNav' items={object('Menu items', createMenuItems(true))} useMini />
      <Routes>
        <Route path='/*' element={<Description useMini />} />
      </Routes>
    </BrowserRouter>
  )
}
