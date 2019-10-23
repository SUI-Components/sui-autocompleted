import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import ResultsList from './results-list'

const DELTA_MOVE = 1
const DOWN = 'ArrowDown'
const ENTER = 'Enter'
const ESCAPE = 'Escape'
const UP = 'ArrowUp'
const noop = () => {}

export function Autocompleted({
  focus,
  getSectionSuggestions = noop,
  handleBlur = noop,
  handleChange = noop,
  handleFocus = noop,
  handleSelect = noop,
  initialValue = '',
  placeholder,
  renderSection = noop,
  renderSuggestion = noop,
  selectFirstByDefault = true,
  suggests,
  title,
  withSections
}) {
  const defaultPosition = selectFirstByDefault
    ? {section: 0, suggestion: 0}
    : -1
  const [active, setActive] = useState(defaultPosition)
  const [showResultList, setShowResultList] = useState(false)
  const [value, setValue] = useState(initialValue)
  const input = useRef(null)
  const wrapper = useRef(null)
  useEffect(() => {
    function documentClickHandler({target}) {
      const isClickOutside =
        wrapper.current && !wrapper.current.contains(target)
      isClickOutside && closeList()
    }

    document.addEventListener('click', documentClickHandler, false)
    return () =>
      document.removeEventListener('click', documentClickHandler, false)
  }, [])

  useEffect(() => {
    if (focus) {
      input.current && input.current.focus()
    }
  }, [focus])

  const focusInput = () => {
    input.current.focus()
  }

  const closeList = () => {
    setActive(null)
    setShowResultList(false)
  }

  const isLastSelected = () => {
    const lastIndex = suggests.length - 1
    const lastSection = withSections ? lastIndex : 0
    const lastPosition = withSections
      ? suggests[lastIndex].suggestions.length - 1
      : lastIndex
    return active.section === lastSection && active.suggestion === lastPosition
  }

  const isFirstSelected = () =>
    active.section === defaultPosition.section &&
    active.suggestion === defaultPosition.suggestion

  const getLastSectionSuggestion = section =>
    withSections
      ? suggests[section].suggestions.length - 1
      : suggests.length - 1

  const moveDown = () => {
    if (isLastSelected()) {
      return active
    }

    return active.suggestion === getLastSectionSuggestion(active.section)
      ? {
          section: active.section + DELTA_MOVE,
          suggestion: 0
        }
      : {
          section: active.section,
          suggestion: active.suggestion + DELTA_MOVE
        }
  }

  const moveUp = () => {
    if (isFirstSelected()) {
      return active
    }

    return active.section !== 0 && active.suggestion === 0
      ? {
          section: active.section - DELTA_MOVE,
          suggestion: getLastSectionSuggestion(active.section - DELTA_MOVE)
        }
      : {
          section: active.section,
          suggestion: active.suggestion - DELTA_MOVE
        }
  }

  const upDownHandler = event => {
    // Never go to negative values or value higher than the list length
    const activeItem = event.key === DOWN ? moveDown() : moveUp()
    setActive(activeItem)
    event.stopPropagation()
    event.preventDefault()
  }

  const enterHandler = () => {
    const suggest = withSections
      ? suggests[active.section].suggestions[active.suggestion]
      : suggests[active.suggestion]
    if (suggest) {
      const selectedValue = suggest.literal || suggest.content
      setValue(selectedValue)
      handleSelect(suggest)
    }
  }

  const escapeHandler = () => {
    closeList()
  }

  const handleSuggestChange = event => {
    const item = event.target.value
    setValue(item)
    setActive(defaultPosition)
    handleChange(item)
  }

  const handleListClear = () => {
    handleSuggestChange({
      target: {
        value: ''
      }
    })
    focusInput()
  }

  const handleSuggestSelect = suggest => {
    setValue(suggest.literal || suggest.content)
    handleSelect(suggest)
  }

  const handleKeyDown = event => {
    setShowResultList(true)
    switch (event.key) {
      case UP:
      case DOWN:
        upDownHandler(event)
        break
      case ENTER:
        enterHandler()
        break
      case ESCAPE:
        escapeHandler()
        break
    }
  }

  const renderResultList = () =>
    suggests && suggests.length > 0 ? (
      <ResultsList
        active={active}
        getSectionSuggestions={getSectionSuggestions}
        renderSection={renderSection}
        renderSuggestion={renderSuggestion}
        suggests={suggests}
        withSections={withSections}
        handleSelect={handleSuggestSelect}
      />
    ) : null

  return (
    <div className="sui-Autocompleted" ref={wrapper}>
      <input
        className="sui-Autocompleted-input"
        onBlur={handleBlur}
        onChange={handleSuggestChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={input}
        title={title}
        type="text"
        value={value}
      />
      <span className="sui-Autocompleted-clear" onClick={handleListClear} />
      {showResultList && renderResultList()}
    </div>
  )
}

Autocompleted.propTypes = {
  focus: PropTypes.bool,
  getSectionSuggestions: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func,
  handleSelect: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  renderSection: PropTypes.func,
  renderSuggestion: PropTypes.func,
  selectFirstByDefault: PropTypes.bool,
  suggests: PropTypes.array.isRequired,
  title: PropTypes.string,
  withSections: PropTypes.bool
}
