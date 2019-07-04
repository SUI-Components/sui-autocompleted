/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const noop = () => {}

export default function ListItem ({content, handleSelect = noop, isActive, isSection, item}) {
  const classes = cx({
    'sui-Autocompleted-item': !isSection,
    'sui-Autocompleted-section': isSection,
    'sui-Autocompleted-item--active': isActive
  })

  /* eslint react/jsx-no-bind: "warn" */
  return (
    <li
      className={classes}
      onClick={handleSelect.bind(null, item)}
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
