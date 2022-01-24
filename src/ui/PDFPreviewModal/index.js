import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as IconClose } from './icon-close.svg'

import { PDFPreview } from '../PDFPreview'

import './styles.scss'

export function PDFPreviewModal ({ open, title, className, onDismiss, loading, base64, error, ...props }) {
  return (
    open === true &&
      <>
        <div tabIndex='0' className={`preview-modal ${className || ''}`} {...props}>
          <div className='preview-modal-backdrop' />
          <div className='preview-modal-positioner'>
            {
              title &&
                <div className='preview-modal-title'>
                  <button tabIndex='0' onClick={onDismiss} className='preview-modal-close-button'>
                    <IconClose alt='' /> {title}
                  </button>
                </div>
            }
            <PDFPreview base64={base64} className={className || 'preview-modal-content'} error={error} loading={loading} />
          </div>
        </div>
      </>
  )
}

PDFPreviewModal.propTypes = {
  base64: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string
}
