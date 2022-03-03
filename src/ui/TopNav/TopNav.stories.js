import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs'

import { BrowserRouter as Router } from 'react-router-dom'

import { TopNav, TopNavItem } from '.'
import { Icon } from '../Icon'

export default getConfig({
  title: 'TopNav',
  component: TopNav,
  decorators: [withKnobs],
  subcomponents: {
    TopNavItem
  }
})

const user = {
  displayName: 'Per Hansen',
  firstName: 'Per',
  lastName: 'Hansen'
}

const menuItems = [
  {
    onClick: () => console.log('Should send user to help'),
    title: 'Gå til hjelp'
  },
  {
    onClick: () => console.log('Should logg out user'),
    title: 'Logg ut'
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
    <Router>
      <TopNav
        brandName={text('Merkenavn', 'Komponentbiblioteket')}
        includeUserInfo={boolean('Inkluder brukerinfo', true)}
        displayName={text('Visningsnavn', user.displayName)}
        firstName={text('Fornavn', user.firstName)}
        lastName={text('Etternavn', user.lastName)}
        menuItems={object('Meny', menuItems)}
      >
        <TopNavItem href='/' icon={<Icon name='home' size='medium' />} title='Intern link' active={window.location.pathname === '/'} />
        <TopNavItem href='https://www.kode24.no' icon={<Icon name='statistics' size='medium' />} title='Esktern link' active={window.location.pathname === '/'} />
      </TopNav>
      <p><strong>TopNav</strong> vil være synlig når <i>innerWidth</i> er mindre enn eller lik <strong>1000px</strong>.</p>
      <p>Går <i>innerWidth</i> til <strong>1001px</strong> eller over skjules den automatisk</p>
      <p><strong>innerWidth</strong>: {width}px</p>
    </Router>
  )
}
