import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Dialog, DialogTitle, DialogBody, DialogActions } from '.'
import { Button } from '../Button'

export default getConfig(
  {
    title: 'Dialog',
    component: Dialog,
    subcomponents: {
      DialogTitle,
      DialogBody,
      DialogActions
    }
  }
)

export function Basic () {
  const [modalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => { setIsModalOpen(!modalOpen) }}>{`${!modalOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={modalOpen}
        onDismiss={() => { setIsModalOpen(false) }}
      >
        <DialogTitle isShowCloseButton>This is the title of the modal</DialogTitle>
        <DialogBody>
          This is the body of the modal
        </DialogBody>
        <DialogActions>
          <Button size='small'>Action1</Button>
          <Button size='small'>Action2</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export function Persistent () {
  const [modalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      If persistent=true clicking outside the dialog or pressing ESC will not close it.<br />
      To close it you will have to provide <b>onClickOutside</b> and <b>onPressEscape</b> functions to handle it yourself
      <Button onClick={() => { setIsModalOpen(!modalOpen) }}>{`${!modalOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={modalOpen}
        persistent
        onDismiss={() => { setIsModalOpen(false) }}
      >
        <DialogTitle isShowCloseButton>This is the title of the modal</DialogTitle>
        <DialogBody>
          This is the body of the modal
        </DialogBody>
        <DialogActions>
          <Button size='small'>Action1</Button>
          <Button size='small' type='secondary' onClick={() => { setIsModalOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
