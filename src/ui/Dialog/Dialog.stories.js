import React, { useState } from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { Dialog, DialogTitle, DialogBody, DialogActions } from '.'
import { Button } from '../Button'
import { Heading3 } from '../Typography'

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
    <>
      <Button onClick={() => { setIsModalOpen(!modalOpen) }}>{`${!modalOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={modalOpen}
        onDismiss={() => { setIsModalOpen(false) }}
      >
        <DialogTitle isShowCloseButton><Heading3>This is the title of the modal</Heading3></DialogTitle>
        <DialogBody>
          <div>This is the body of the modal, here you can put anything.</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ marginTop: '1rem' }} src='https://www.vtfk.no/globalassets/administrasjon/vtfk/system/layout/vtfk-logo.svg' />
          </div>
        </DialogBody>
        <DialogActions>
          <Button size='small'>Action1</Button>
          <Button size='small'>Action2</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function Resizeable () {
  const [dialogOpen, setIsDialogOpen] = useState(false)
  const [dialog2Open, setDialog2Open] = useState(false)
  const [dialog3Open, setDialog3Open] = useState(false)

  return (
    <>
      <p />
      <Button onClick={() => { setIsDialogOpen(!dialogOpen) }}>{`${!dialogOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => { setIsDialogOpen(false) }}
        showCloseButton
        width='60%'
        height='50%'
        resizeable
      >
        <DialogTitle>This is the first dialog, and it is resizeable</DialogTitle>
        <DialogBody>
          Click to open another dialog
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(true)}>Open nested dialog</Button>
          <Button size='small' onClick={() => setDialog3Open(true)}>Open nested, resizeable dialog</Button>
          <Button size='small' type='secondary' onClick={() => { setIsDialogOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        isOpen={dialog2Open}
        onDismiss={() => setDialog2Open(false)}
        width='50%'
        height='30%'
        resizeable={false}
      >
        <DialogTitle>
          This is a nested dialog, this should not be resizeable
        </DialogTitle>
        <DialogBody>
          Test
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        isOpen={dialog3Open}
        onDismiss={() => setDialog3Open(false)}
        width='50%'
        height='30%'
        resizeable
      >
        <DialogTitle>
          This is a nested dialog, this should be resizeable
        </DialogTitle>
        <DialogBody>
          Test
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog3Open(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function Persistent () {
  const [modalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      If persistent=true clicking outside the dialog or pressing ESC will not close it.<br />
      To close it you will have to provide <b>onClickOutside</b> and <b>onPressEscape</b> functions to handle it yourself
      <Button onClick={() => { setIsModalOpen(!modalOpen) }}>{`${!modalOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={modalOpen}
        persistent
        onDismiss={() => { setIsModalOpen(false) }}
        showCloseButton
      >
        <DialogTitle>This is the title of the modal</DialogTitle>
        <DialogBody>
          This is the body of the modal
        </DialogBody>
        <DialogActions>
          <Button size='small'>Action1</Button>
          <Button size='small' type='secondary' onClick={() => { setIsModalOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function Nested () {
  const [dialogOpen, setIsDialogOpen] = useState(false)
  const [dialog2Open, setDialog2Open] = useState(false)

  return (
    <>
      <p />
      <Button onClick={() => { setIsDialogOpen(!dialogOpen) }}>{`${!dialogOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => { setIsDialogOpen(false) }}
        showCloseButton
        width='60%'
        height='50%'
      >
        <DialogTitle>This is the first dialog</DialogTitle>
        <DialogBody>
          Click to open another dialog
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(true)}>Open nested dialog</Button>
          <Button size='small' type='secondary' onClick={() => { setIsDialogOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        isOpen={dialog2Open}
        onDismiss={() => setDialog2Open(false)}
        width='50%'
        height='30%'
      >
        <DialogTitle>
          This is the second nested dialog
        </DialogTitle>
        <DialogBody>
          Test
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function PreventScrollingBehind () {
  const [dialogOpen, setIsDialogOpen] = useState(false)
  const [dialog2Open, setDialog2Open] = useState(false)

  return (
    <>
      <div style={{ height: '200vh' }}>
        This is big div twice the height of the screen, it should not scroll when dialog is open
        <Button onClick={() => { setIsDialogOpen(!dialogOpen) }}>{`${!dialogOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      </div>
      <p />

      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => { setIsDialogOpen(false) }}
        showCloseButton
        width='60%'
        height='50%'
      >
        <DialogTitle>This is the first dialog</DialogTitle>
        <DialogBody>
          Click to open another dialog
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(true)}>Open nested dialog</Button>
          <Button size='small' type='secondary' onClick={() => { setIsDialogOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        isOpen={dialog2Open}
        onDismiss={() => setDialog2Open(false)}
        width='50%'
        height='30%'
      >
        <DialogTitle>
          This is the second nested dialog
        </DialogTitle>
        <DialogBody>
          Test
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export function Draggable () {
  const [dialogOpen, setIsDialogOpen] = useState(false)
  const [dialog2Open, setDialog2Open] = useState(false)

  return (
    <>
      <div>
        <Button onClick={() => { setIsDialogOpen(!dialogOpen) }}>{`${!dialogOpen ? 'Åpne' : 'Lukk'} modal`}</Button>
      </div>
      <p />

      <Dialog
        isOpen={dialogOpen}
        onDismiss={() => { setIsDialogOpen(false) }}
        showCloseButton
        draggable
        contained
        width='60%'
        height='50%'
      >
        <DialogTitle>This is the first dialog</DialogTitle>
        <DialogBody>
          Click and drag the top part of the dialog to move it.<br />
          This dialog is <b>contained</b> and is not allowed to move outside it's parents bounds
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(true)}>Open nested dialog</Button>
          <Button size='small' type='secondary' onClick={() => { setIsDialogOpen(false) }}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        isOpen={dialog2Open}
        onDismiss={() => setDialog2Open(false)}
        width='50%'
        draggable
        height='30%'
      >
        <DialogTitle>
          Draggable nested dialog
        </DialogTitle>
        <DialogBody>
          This dialog is also draggable, but it is not <b>contained</b>
        </DialogBody>
        <DialogActions>
          <Button size='small' onClick={() => setDialog2Open(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
