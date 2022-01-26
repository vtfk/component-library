import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Work } from './illustration-work.svg'
import { ReactComponent as Outdoors } from './illustration-outdoors.svg'
import { ReactComponent as People } from './illustration-people.svg'
import { ReactComponent as Health } from './illustration-health.svg'
import { ReactComponent as Sports } from './illustration-sports.svg'
import { ReactComponent as Immigrant } from './illustration-immigrant.svg'
import { ReactComponent as Climate } from './illustration-climate.svg'
import { ReactComponent as Culture } from './illustration-culture.svg'
// import { ReactComponent as Mobility } from './illustration-mobility.svg'
import { ReactComponent as Learn } from './illustration-learn.svg'

import './styles.scss'

export function Illustration ({ name, size, className, ...props }) {
  const illustrationNameMapping = {
    work: <Work />,
    outdoors: <Outdoors />,
    people: <People />,
    health: <Health />,
    sports: <Sports />,
    immigrant: <Immigrant />,
    climate: <Climate />,
    culture: <Culture />,
    // mobility: <Mobility />,
    learn: <Learn />,
  }

  return (
    <span className={`illustration ${size} ${className}`} {...props}>
      {illustrationNameMapping[name]}
    </span>
  )
}

Illustration.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string
}
