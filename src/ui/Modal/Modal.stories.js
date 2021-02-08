import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Modal, ModalBody, ModalSideActions } from '.'

export default getConfig(
  { title: 'Modal', component: Modal }
)

export function Basic () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => { setModalOpen(!modalOpen) }}>Toggle modal</button>
      <Modal
        open={modalOpen}
        title='Dette er tittelen'
        onDismiss={() => { setModalOpen(false) }}
      >
        <ModalBody>
          Dette er bodyen
        </ModalBody>
        <ModalSideActions>
          Dette er side actions
        </ModalSideActions>
      </Modal>
    </div>
  )
}
