import marked from 'marked'
import React from 'react'
import packageJson from '../../package.json'

import readMe from '../../README.md'
// import developerReadMe from '../../scripts/build/README_PACKAGE.md'

import changeLog from '../../CHANGELOG.md'

import './documentation.css'

export default {
  title: 'Dokumentasjon',
  parameters: {
    options: {
      showPanel: false
    },
    layout: 'centered'
  }
}
}

function versionizeReadMe (readMeContent) {
  const readMeLines = readMeContent.split('\n')
  return [readMeLines[0] + `<div class="version">Versjon ${packageJson.version}<div>`, ...readMeLines.slice(1)].join('\n')
}

export function Introduksjon () {
  return <div className='documentation' dangerouslySetInnerHTML={{ __html: marked(versionizeReadMe(readMe)) }} />
}

export function Changelog () {
  return <div className='documentation' dangerouslySetInnerHTML={{ __html: marked(changeLog) }} />
}
