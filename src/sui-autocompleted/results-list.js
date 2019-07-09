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
  const renderSuggestions = ({items, sectionIndex = 0}) => items.map((suggest, index) => (
    <ListItem
      content={suggest.content || renderSuggestion(suggest)}
      isActive={active && sectionIndex === active.section && index === active.suggestion}
      item={suggest}
      key={suggest.id || index}
      handleSelect={handleSelect}
      />
    ))

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
                item={item}
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
  active: PropTypes.object,
  getSectionSuggestions: PropTypes.func,
  handleSelect: PropTypes.func,
  renderSection: PropTypes.func,
  renderSuggestion: PropTypes.func,
  suggests: PropTypes.array.isRequired,
  withSections: PropTypes.bool
}
