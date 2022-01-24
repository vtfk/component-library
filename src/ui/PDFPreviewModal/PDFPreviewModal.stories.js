import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { PDFPreviewModal } from '.'

export default getConfig(
  { title: 'PDFPreviewModal', component: PDFPreviewModal }
)

export function Basic () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => { setModalOpen(!modalOpen) }}>Toggle modal</button>
      <PDFPreviewModal
        base64='JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G'
        open={modalOpen}
        title='Lukk modal'
        onDismiss={() => { setModalOpen(false) }}
      />
    </div>
  )
}

export function Loading () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => { setModalOpen(!modalOpen) }}>Toggle loading modal</button>
      <PDFPreviewModal
        open={modalOpen}
        title='Lukk loading modal'
        onDismiss={() => { setModalOpen(false) }}
        loading
      />
    </div>
  )
}

export function Error () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => { setModalOpen(!modalOpen) }}>Toggle error modal</button>
      <PDFPreviewModal
        open={modalOpen}
        title='Lukk error modal'
        onDismiss={() => { setModalOpen(false) }}
        error
      />
    </div>
  )
}
