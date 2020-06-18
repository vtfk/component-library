import marked from 'marked'
import React from 'react'
import packageJson from '../../package.json'

// import readMe from '../../README.md'
// import developerReadMe from '../../scripts/build/README_PACKAGE.md'

import introduksjon from './content/introduksjon.md'
import bruk from './content/bruk.md'
import videreutvikling from './content/videreutvikling.md'
import changeLog from '../../CHANGELOG.md'

import './documentation.css'

export default {
  title: 'Dokumentasjon',
  parameters: {
    options: {
      showPanel: false,
    },
  },
}

function versionizeReadMe(readMeContent) {
  const readMeLines = readMeContent.split('\n')
  return [readMeLines[0] + ` (v${packageJson.version})`, ...readMeLines.slice(1)].join('\n')
}

export function Introduksjon() {
  return <div className="documentation" dangerouslySetInnerHTML={{ __html: marked(versionizeReadMe(introduksjon)) }} />
}

export function Bruk() {
  return <div className="documentation" dangerouslySetInnerHTML={{ __html: marked(bruk) }} />
}

export function Videreutvikling() {
  return <div className="documentation" dangerouslySetInnerHTML={{ __html: marked(videreutvikling) }} />
}

export function Changelog() {
  return <div className="documentation" dangerouslySetInnerHTML={{ __html: marked(changeLog) }} />
}
