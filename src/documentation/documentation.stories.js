import React from 'react'
import { marked } from 'marked'
import hljs from 'highlight.js'

import packageJson from '../../package.json'
import design from './content/design.md'
import readMe from '../../README.md'

import 'highlight.js/styles/atom-one-dark.css'
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

function versionizeReadMe (readMeContent) {
  const readMeLines = readMeContent.split('\n')
  return [
    '<img src="https://designmanual.vtfk.no/css/images/VT-logo.svg" class="logo" alt="" /><br />',
    readMeLines[0] + `<div class="version">Versjon ${packageJson.version}<div>`,
    ...readMeLines.slice(1)
  ].join('\n')
}

function convertMarkdown (markdown) {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value
    }
  })

  return marked(markdown)
}

export function Introduksjon () {
  return <div className='documentation' dangerouslySetInnerHTML={{ __html: convertMarkdown(versionizeReadMe(readMe)) }} />
}

export function Designsystem () {
  return <div className='documentation design' dangerouslySetInnerHTML={{ __html: convertMarkdown(design) }} />
}
