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
      <button onClick={() => { setModalOpen(!modalOpen) }}>Toggle modal</button>
      <PDFPreviewModal
        base64='....'
        open={modalOpen}
        title='Lukk modal'
        onDismiss={() => { setModalOpen(false) }}
      />
    </div>
  )
}
