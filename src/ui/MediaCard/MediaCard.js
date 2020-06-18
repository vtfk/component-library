import PropTypes from 'prop-types'
import React from 'react'
import './MediaCard.scss'

function MediaCard({ text }) {
  return <div className={'media-card'}>{text}</div>
}

MediaCard.propTypes = {
  text: PropTypes.string,
}

export default MediaCard
