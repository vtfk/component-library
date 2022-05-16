import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

import { ReactComponent as CloseIcon } from './icon-close.svg'

import './styles.scss'

export function Dialog ({ isOpen, title, className, persistent, width, height, showCloseButton, onDismiss, onCloseBtnClick, onClickOutside, onPressEscape, style, ...props }) {
  // Set an unique ID for the dialog
  const [id] = useState(`${nanoid()}`)
  // Parents that have overflow set
  const [overflowParents, setoverflowParents] = useState();

  const parsedStyles = useMemo(() => {
    const _style = { ...style }
    if (width) _style.width = width
    if (height) _style.height = height
    return _style
  }, [style, width, height])

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

    // Register eventhandlers
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    const dialogs = document.getElementsByClassName('dialog')
    const thisDialog = document.getElementById(`dialog-${id}`);

    /**
     * Retreives all parents of an element
     * @param {HTMLElement} element 
     * @returns {HTMLElement[] | undefined}
     */
    function getParents(element) {
      if(!element) return;
      if(!element.parentNode) return;
      const parents = [];
      let currentElement = element;
      while(currentElement.parentNode && currentElement.parentNode.style) {
        currentElement = currentElement.parentNode;
        console.log('Current name', currentElement.nodeName)
        parents.push(currentElement);
      }
      return parents;
    }

    function enableScrolling() {
      if(dialogs.length > 0) return;

      // Reset all overflow settings
      if(overflowParents && overflowParents.length > 0) {
        for(const parent of overflowParents) {
          parent.element.style = {
            ...parent.element.style,
            ...parent.style
          }
        }
        setoverflowParents([]);
      }
    }

    if(isOpen) {
      // Get all parents
      let parents = getParents(thisDialog);
      
      if(parents && parents.length > 0) {
        // Filter to only the parents where overflow is specified
        console.log('Found parents', parents)
        // Parent state
        let parentState = [];
        for(const parent of parents) {
          // Retreive the parents overflow state
          parentState.push({
            element: parent,
            style: {
              overflow: parent.style.overflow,
              overflowX: parent.style.overflowX,
              overflowY: parent.style.overflowY
            }
          })
          // Set the overflow to hidden
          parent.style.overflow = 'hidden';
          parent.style.overflowX = 'hidden';
          parent.style.overflowY = 'hidden';
        }
        setoverflowParents(parentState);
      }
    } else {
      enableScrolling();
    }

    return () => {
      enableScrolling();
    }
  }, [isOpen])


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
      <>
        <div id={`dialog-backdrop-${id}`} className={`dialog-backdrop ${className}`} onClick={(e) => handleBackdropClick(e)}>
          <div
            id={`dialog-${id}`}
            className='dialog'
            aria-label='dialog'
            aria-modal='true'
            role='dialog'
            style={parsedStyles}
          >
            {!persistent && showCloseButton &&
              <button className='dialog-close-btn' onClick={(e) => { handleCloseBtnClick(); e.preventDefault() }} aria-label='Lukk'>
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
