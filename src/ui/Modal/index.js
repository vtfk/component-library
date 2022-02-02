import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import ScrollLock, { TouchScrollable } from 'react-scrolllock'

import { ReactComponent as CloseIcon } from './icon-close.svg'

import './styles.scss'

export function Modal ({ open, title, className, closeOnEscape, onDismiss, onFinished, ...props }) {
  // onCreated lifecycle-hook
  useEffect(() => {
    function handleKeyPress (e) {
      if (e?.key === 'Escape' && open && closeOnEscape && onDismiss && typeof onDismiss === 'function') onDismiss()
    }
    document.addEventListener('keyup', handleKeyPress)
    return () => document.removeEventListener('keyup', handleKeyPress)
  })

  return (
    open === true &&
      <>
        <ScrollLock isActive={open}>
          <div tabIndex='0' className={`modal ${className || ''}`} aria-modal='true' role='dialog' {...props}>
            <div className='modal-backdrop' />
            <div className='modal-positioner'>
              {
                title &&
                  <div className='modal-title'>
                    <button tabIndex='0' onClick={onDismiss} className='modal-close-button' aria-label='Lukk'>
                      <CloseIcon alt='' />
                    </button> {title}
                  </div>
              }
              <TouchScrollable>
                <div className='modal-content'>
                  {props.children}
                </div>
              </TouchScrollable>
            </div>
          </div>
        </ScrollLock>
      </>
  )
}

export function ModalBody (props) {
  return (
    <>
      <div className='modal-body' {...props}>
        {props.children}
      </div>
    </>
  )
}

export function ModalSideActions (props) {
  return (
    <>
      <div className='modal-side-actions' {...props}>
        <div>
          {props.children}
        </div>
      </div>
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  closeOnEscape: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  onFinished: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string
}

Modal.defaultProps = {
  closeOnEscape: true
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

ModalSideActions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
