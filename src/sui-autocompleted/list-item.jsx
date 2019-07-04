/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export default function ListItem ({content, handleSelect, isActive, isSection, item}) {
  const classes = cx({
    'sui-Autocompleted-item': !isSection,
    'sui-Autocompleted-section': isSection,
    'sui-Autocompleted-item--active': isActive
  })

  /* eslint react/jsx-no-bind: "warn" */
  return (
    <li
      className={classes}
    >
      {content}
    </li>
  )
}

ListItem.propTypes = {
  content: PropTypes.element,
  item: PropTypes.object,
  handleSelect: PropTypes.func,
  isActive: PropTypes.bool
}
