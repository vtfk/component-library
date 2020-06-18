import PropTypes from 'prop-types'
import React from 'react'
import './Card.scss'

function Card({ text }) {
  return <div className={'card'}>{text}</div>
}

Card.propTypes = {
  text: PropTypes.string,
}

export default Card
