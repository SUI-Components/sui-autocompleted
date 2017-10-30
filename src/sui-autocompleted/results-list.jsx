import React from 'react'
import PropTypes from 'prop-types'
import ListItem from './list-item'

export default function ResultsList (props) {
  return (
    <ul className='sui-Autocompleted-results'>
      {props.suggests.map((suggest, index) =>
        (<ListItem
          {...props}
          key={suggest.id || index}
          item={suggest}
          isActive={index === props.active} />
        )
      )}
    </ul>
  )
}

ResultsList.propTypes = {
  suggests: PropTypes.array.isRequired,
  active: PropTypes.number
}
