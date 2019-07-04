/* eslint-disable */
import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import ListItem from './list-item'

export default function ResultsList ({
    active,
    getSectionSuggestions,
    handleSelect,
    renderSection,
    renderSuggestion,
    suggests,
    withSections
  }) {
  const renderSuggestions = ({items, sectionIndex = 0}) => {
    return items.map((suggest, index) => {
      return (
      <ListItem
        content={renderSuggestion(suggest)}
        key={suggest.id || index}
        item={suggest}
        isActive={active && sectionIndex === active.section && index === active.suggestion}
      />
    )}
    )
  }

  return (
    <ul className='sui-Autocompleted-results'>
      {withSections ? suggests.map((item, sectionIndex) => {
        const content = renderSection(item.section)
        return (
          <Fragment>
            {content && 
              <ListItem
                content={content}
                isSection
                item={item.section}
                key={`section${item.section}`}
              />
            }
            {
              renderSuggestions({items: getSectionSuggestions(item), sectionIndex})
            }
          </Fragment>
        )
      }) : renderSuggestions({items: suggests})
      }
    </ul>
  )
}

ResultsList.propTypes = {
  active: PropTypes.number,
  getSectionSuggestions: PropTypes.func,
  handleSelect: PropTypes.func,
  renderSection: PropTypes.func,
  renderSuggestion: PropTypes.func,
  suggests: PropTypes.array.isRequired,
  withSections: PropTypes.bool
}
