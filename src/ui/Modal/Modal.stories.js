import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Modal, ModalBody, ModalSideActions } from '.'
import { Button } from '../Button'

export default getConfig(
  { title: 'Modal', component: Modal }
)

export function Basic () {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => { setModalOpen(!modalOpen) }}>{!modalOpen ? 'Åpne' : 'Lukk'} modal</Button>
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
