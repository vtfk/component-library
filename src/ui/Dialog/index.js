import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as CloseIcon } from './icon-close.svg'

import './styles.scss'
import ScrollLock from 'react-scrolllock'
import { Draggable } from '../Draggable'

export function Dialog ({ isOpen, title, className, persistent, width, height, draggable, contained, resizeable, showCloseButton, onDismiss, onCloseBtnClick, onClickOutside, onPressEscape, style, ...props }) {
  // Set an unique ID for the dialog
  const [id] = useState(`${nanoid()}`)

  const [clickStartedInsideDialog, setClickStartedInsideDialog] = useState(undefined)
  const [isDragging, setIsDragging] = useState(false)
  const dialogRef = useRef(null)

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
      setIsDragging(false)
    }

    // Register eventhandlers
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

  const dialogClasses = useMemo(() => {
    let classes = 'dialog'
    if (isDragging) classes += ' dialog-no-select'
    if (resizeable) classes += ' dialog-resizeable'

    return classes
  }, [isDragging])

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
          <Draggable active={draggable && isDragging} contained={contained} width={dialogRef?.current?.offsetWidth || width} height={dialogRef?.current?.offsetHeight || height}>
            <div
              id={`dialog-${id}`}
              className={dialogClasses}
              aria-label='dialog'
              aria-modal='true'
              role='dialog'
              style={style}
              onMouseDown={() => { setClickStartedInsideDialog(true) }}
              ref={dialogRef}
            >
              {draggable && <div className='dialog-drag-area' onMouseDown={() => setIsDragging(true)} />}
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
  contained: PropTypes.bool,
  draggable: PropTypes.bool,
  height: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
  onCloseBtnClick: PropTypes.func,
  onDismiss: PropTypes.func.isRequired,
  onPressEscape: PropTypes.func,
  persistent: PropTypes.bool,
  resizeable: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.string
}

Dialog.defaultProps = {
  contained: true,
  draggable: true,
  persistent: false,
  resizeable: true,
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
