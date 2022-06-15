import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs'

import { TopBar } from '.'

export default getConfig({
  title: 'TopBar',
  component: TopBar,
  decorators: [withKnobs]
})

const user = {
  displayName: 'Per Hansen',
  firstName: 'Per',
  lastName: 'Hansen'
}

const items = [
  {
    closeOnClick: true,
    onClick: () => console.log('Should send user to help'),
    title: 'Gå til hjelp'
  },
  {
    closeOnClick: true,
    onClick: () => console.log('Should log out user'),
    title: 'Logg ut'
  }
]

const Description = () => {
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
      <p><strong>TopBar</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</p>
      <p>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk</p>
      <p><strong>innerWidth</strong>: {width}px</p>
    </>
  )
}

export function Basic () {
  return (
    <div>
      <TopBar
        includeUserInfo={boolean('Inkluder brukerinfo', true)}
        displayName={text('Visningsnavn', user.displayName)}
        firstName={text('Fornavn', user.firstName)}
        lastName={text('Etternavn', user.lastName)}
        items={object('Menyvalg', items)}
      />
      <Description />
    </div>
  )
}
  return (
    <div>
      <TopBar
        includeUserInfo={boolean('Inkluder brukerinfo', true)}
        displayName={text('Visningsnavn', user.displayName)}
        firstName={text('Fornavn', user.firstName)}
        lastName={text('Etternavn', user.lastName)}
        items={object('Menyvalg', items)}
      />
      <p><strong>TopBar</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</p>
      <p>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk</p>
      <p><strong>innerWidth</strong>: {width}px</p>
    </div>
  )
}
