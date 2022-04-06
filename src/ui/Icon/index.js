import React from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Home } from './icon-home.svg'
import { ReactComponent as Activity } from './icon-activity.svg'
import { ReactComponent as Classes } from './icon-classes.svg'
import { ReactComponent as Students } from './icon-students.svg'
import { ReactComponent as Statistics } from './icon-statistics.svg'
import { ReactComponent as Help } from './icon-help.svg'
import { ReactComponent as Info } from './icon-info.svg'
import { ReactComponent as ArrowRight } from './icon-arrow-right.svg'
import { ReactComponent as ArrowLeft } from './icon-arrow-left.svg'
import { ReactComponent as Add } from './icon-add.svg'
import { ReactComponent as Check } from './icon-check.svg'
import { ReactComponent as Edit } from './icon-edit.svg'
import { ReactComponent as Close } from './icon-close.svg'
import { ReactComponent as Menu } from './icon-menu.svg'
import { ReactComponent as Pause } from './icon-pause.svg'
import { ReactComponent as Retry } from './icon-retry.svg'
import { ReactComponent as Search } from './icon-search.svg'
import { ReactComponent as ChevronUp } from './icon-chevron-up.svg'
import { ReactComponent as ChevronDown } from './icon-chevron-down.svg'
import { ReactComponent as Delete } from './icon-delete.svg'
import { ReactComponent as Settings } from './icon-settings.svg'
import { ReactComponent as Copy } from './icon-copy.svg'
import { ReactComponent as Lock } from './icon-lock.svg'
import { ReactComponent as Link } from './icon-link.svg'
import { ReactComponent as External } from './icon-external.svg'
import { ReactComponent as Warning } from './icon-warning.svg'

import './styles.scss'

export const icons = {
  home: <Home />,
  activity: <Activity />,
  classes: <Classes />,
  students: <Students />,
  statistics: <Statistics />,
  help: <Help />,
  info: <Info />,
  warning: <Warning />,
  arrowRight: <ArrowRight />,
  arrowLeft: <ArrowLeft />,
  chevronUp: <ChevronUp />,
  chevronDown: <ChevronDown />,
  add: <Add />,
  check: <Check />,
  close: <Close />,
  menu: <Menu />,
  search: <Search />,
  pause: <Pause />,
  retry: <Retry />,
  delete: <Delete />,
  edit: <Edit />,
  settings: <Settings />,
  copy: <Copy />,
  lock: <Lock />,
  link: <Link />,
  external: <External />
}

export function Icon ({ name, size, className, ...props }) {
  return (
    <span className={`icon ${size} ${className}`} {...props}>
      {icons[name]}
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
  size: PropTypes.string
}
