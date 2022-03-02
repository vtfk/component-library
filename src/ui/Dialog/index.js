import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as CloseIcon } from './icon-close.svg'

import './styles.scss'

export function Dialog ({ isOpen, title, className, persistent, showCloseButton, onDismiss, onCloseBtnClick, onClickOutside, onPressEscape, style, ...props }) {
  // Set an unique ID for the dialog
  const [id] = useState(`dialog-${nanoid()}`)

  // onCreated lifecycle-hook
  useEffect(() => {
    function shakeDialogBox () {
      const dialog = document.getElementById(id)
      function animationEndCallback () {
        dialog.removeEventListener('animationend', animationEndCallback)
        dialog.classList.remove('animation-shake')
      }

      dialog.classList.toggle('animation-shake')
      dialog.addEventListener('animationend', animationEndCallback)
    }
    function handleMouseClick (e) {
      // Check if is open, a onClickOutside function prop is passed and it has actually clicked outside
      if (isOpen && !e.path.find((i) => i.id === id)) {
        e.preventDefault()
        if (persistent && !onClickOutside) shakeDialogBox()
        else if (onClickOutside && typeof onClickOutside === 'function') onClickOutside()
        else if (onDismiss && typeof onDismiss === 'function') onDismiss()
      }
    }
    function handleKeyDown (e) {
      if (e.code === 'Escape' && isOpen) {
        if (persistent && !onPressEscape) shakeDialogBox()
        else if (onPressEscape && typeof onPressEscape === 'function') onPressEscape()
        else if (onDismiss && typeof onDismiss === 'function') onDismiss()
      }
    }

    // Register eventhandlers
    document.addEventListener('mousedown', handleMouseClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  function handleCloseBtnClick () {
    if (onCloseBtnClick && typeof onCloseBtnClick === 'function') onCloseBtnClick()
    else if (onDismiss && typeof onDismiss === 'function') onDismiss()
  }

  // Render the component
  return (
    isOpen === true &&
      <>
        <div className={`dialog-backdrop ${className}`} style={style}>
          <div id={id} className='dialog' css={`width: ${props.width || '100%'}`} aria-label='dialog' aria-modal='true' role='dialog'>
            {!persistent && showCloseButton &&
              <button className='dialog-close-btn' onClick={() => { handleCloseBtnClick() }} aria-label='Lukk'>
                <CloseIcon alt='' />
              </button>}
            {props.children}
          </div>
        </div>
      </>
  )
}

export function DialogTitle ({ children, style }) {
  return (
    <>
      <div className='dialog-title' style={style}>
        {children}
      </div>
    </>
  )
}

export function DialogBody ({ children, style }) {
  return (
    <>
      <div className='dialog-body' style={style}>
        {children}
      </div>
    </>
  )
}

export function DialogActions ({ children, style }) {
  return (
    <>
      <div className='dialog-actions' style={style}>
        {children}
      </div>
    </>
  )
}

Dialog.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
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
