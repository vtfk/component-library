import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as CloseIcon } from './icon-close.svg'

import './styles.scss'
import ScrollLock from 'react-scrolllock'
import { Draggable } from '../Draggable'

export function Dialog ({ isOpen, title, className, persistent, width, height, draggable, showCloseButton, onDismiss, onCloseBtnClick, onClickOutside, onPressEscape, style, ...props }) {
  // Set an unique ID for the dialog
  const [id] = useState(`${nanoid()}`)

  const [clickStartedInsideDialog, setClickStartedInsideDialog] = useState(undefined)

  // onCreated lifecycle-hook
  useEffect(() => {
    function handleKeyDown (e) {
      if (e.code === 'Escape' && isOpen) {
        // Determine if this is the active dialog
        const dialogs = document.getElementsByClassName('dialog')

        let isActiveDialog = false
        if (!dialogs || dialogs.length <= 1) isActiveDialog = true
        else if (dialogs[dialogs.length - 1].id === `dialog-${id}`) isActiveDialog = true

        // If it is, run actions
        if (isActiveDialog) {
          if (persistent && !onPressEscape) shakeDialogBox()
          else if (onPressEscape && typeof onPressEscape === 'function') onPressEscape()
          else if (onDismiss && typeof onDismiss === 'function') onDismiss()
        }
      }
    }

    function handleMouseUp (e) {
      setClickStartedInsideDialog(false)
    }

    // Register eventhandlers
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

  const dialogStyle = useMemo(() => {
    const _s = {}
    if (!draggable) {
      _s.width = width || '100%'
      _s.height = height || '100%'
    } else {
      _s.width = '100%';
      _s.height = '100%';
    }

    return _s
  }, [draggable, width, height])

  // Plays the shaking animation-effect when the dialog is persistent
  function shakeDialogBox () {
    const dialog = document.getElementById(`dialog-${id}`)
    function animationEndCallback () {
      dialog.removeEventListener('animationend', animationEndCallback)
      dialog.classList.remove('animation-shake')
    }

    dialog.classList.toggle('animation-shake')
    dialog.addEventListener('animationend', animationEndCallback)
  }

  function handleBackdropClick (e) {
    if (clickStartedInsideDialog) return
    const clickedBackdrop = e.target.id === `dialog-backdrop-${id}`

    if (isOpen && clickedBackdrop) {
      if (persistent) shakeDialogBox()
      else if (onClickOutside && typeof onClickOutside === 'function') onClickOutside()
      else if (onDismiss && typeof onDismiss === 'function') onDismiss()
    }
  }

  function handleCloseBtnClick () {
    if (onCloseBtnClick && typeof onCloseBtnClick === 'function') onCloseBtnClick()
    else if (onDismiss && typeof onDismiss === 'function') onDismiss()
  }

  // Render the component
  return (
    isOpen === true &&
      <ScrollLock isActive={isOpen}>
        <div id={`dialog-backdrop-${id}`} className={`dialog-backdrop ${className}`} onMouseUp={(e) => handleBackdropClick(e)}>
          <Draggable active={draggable} width={width} height={height}>
            <div
              id={`dialog-${id}`}
              className='dialog'
              aria-label='dialog'
              aria-modal='true'
              role='dialog'
              style={style}
              onMouseDown={(e) => { setClickStartedInsideDialog(true) }}
            >
              <div className='dialog-drag-area'/>
              {!persistent && showCloseButton &&
                <button className='dialog-close-btn' onClick={(e) => { handleCloseBtnClick(); e.preventDefault() }} aria-label='Lukk'>
                  <CloseIcon alt='' />
                </button>}
              {props.children}
            </div>
          </Draggable>
        </div>

      </ScrollLock>
  )
}

export function DialogTitle ({ children, style }) {
  return (
    <div className='dialog-title' style={style}>
      {children}
    </div>
  )
}

export function DialogBody ({ children, style }) {
  return (
    <div className='dialog-body' style={style}>
      {children}
    </div>
  )
}

export function DialogActions ({ children, style }) {
  return (
    <div className='dialog-actions' style={style}>
      {children}
    </div>
  )
}

Dialog.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  draggable: PropTypes.bool,
  height: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
  onCloseBtnClick: PropTypes.func,
  onDismiss: PropTypes.func.isRequired,
  onPressEscape: PropTypes.func,
  persistent: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.string
}

Dialog.defaultProps = {
  persistent: false,
  showCloseButton: true
}

DialogTitle.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}

DialogBody.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}

DialogActions.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}
