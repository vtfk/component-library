import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

export function PDFPreview ({ className, loading, base64, error }) {
  let pdf = false

  if (base64) {
    pdf = React.createElement(
      'object', {
        type: 'application/pdf',
        data: 'data:application/pdf;base64,' + base64,
        width: '100%',
        height: '100%',
        'aria-label': 'PDF-dokument'
      }
    )
  }

  return (
    <div className={className || 'preview-content'}>
      <div className={className ? className.includes('modal') ? 'preview-modal-body' : className : 'preview-body'}>
        {base64 && pdf ? pdf : ''}
        {loading && !base64 && !error ? <div className={className ? className.includes('modal') ? 'preview-modal-loading' : className : 'preview-loading'}><span>.</span><span>.</span><span>.</span></div> : ''}
        {error ? <div className={className ? className.includes('modal') ? 'preview-modal-error' : className : 'preview-error'}>Det har skjedd en feil, vennligst prøv igjen.</div> : ''}
      </div>
    </div>
  )
}

PDFPreview.propTypes = {
  base64: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
  loading: PropTypes.bool
}
