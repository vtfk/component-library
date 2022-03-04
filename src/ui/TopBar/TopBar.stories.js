import React, { useEffect, useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { TopBar } from '.'
import { IconDropdownNavItem } from '../IconDropdownNav'

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
    <div>
      <TopBar
        includeUserInfo={boolean('Inkluder brukerinfo', true)}
        displayName={text('Visningsnavn', user.displayName)}
        firstName={text('Fornavn', user.firstName)}
        lastName={text('Etternavn', user.lastName)}
      >
        <IconDropdownNavItem closeOnClick title='Gå til hjelp' onClick={() => console.log('Should send user to help')} />
        <IconDropdownNavItem closeOnClick title='Logg ut' onClick={() => console.log('Should logg out user')} />
      </TopBar>
      <p><strong>TopBar</strong> vil være synlig når <i>innerWidth</i> er større enn <strong>1000px</strong>.</p>
      <p>Går <i>innerWidth</i> til <strong>1000px</strong> eller mindre skjules den automatisk</p>
      <p><strong>innerWidth</strong>: {width}px</p>
    </div>
  )
}
