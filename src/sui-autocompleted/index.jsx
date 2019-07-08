import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ResultsList from './results-list'

const DELTA_MOVE = 1
const DOWN = 'ArrowDown'
const ENTER = 'Enter'
const ESCAPE = 'Escape'
const UP = 'ArrowUp'

export default class Autocompleted extends Component {
  constructor (...args) {
    super(...args)

    const { selectFirstByDefault, initialValue, focus } = this.props

    this.input = null
    this.wrapper = null
    this.defaultPosition = selectFirstByDefault ? {section: 0, suggestion: 0} : -1

    this.state = {
      active: this.defaultPosition,
      focus: focus,
      showResultList: false,
      value: initialValue
    }
  }

  isLastSelected = () => {
    const { active } = this.state
    const { suggests, withSections } = this.props
    const lastIndex = suggests.length - 1
    const lastSection = withSections ? lastIndex : 0
    const lastPosition = withSections ? suggests[lastIndex].suggestions.length - 1 : lastIndex
    return active.section === lastSection && active.suggestion === lastPosition
  }

  isFirstSelected = () => {
    const { active } = this.state
    return active.section === this.defaultPosition.section &&
      active.suggestion === this.defaultPosition.suggestion
  }

  getLastSectionSuggestion = section => this.props.withSections ? this.props.suggests[section].suggestions.length - 1 : this.props.suggests.length - 1

  moveDown = () => {
    const { active } = this.state
    const isLastSelected = this.isLastSelected()
    if (isLastSelected) {
      return active
    }

    return active.suggestion === this.getLastSectionSuggestion(active.section) ? {
      section: active.section + DELTA_MOVE,
      suggestion: 0
    } : {
      section: active.section,
      suggestion: active.suggestion + DELTA_MOVE
    }
  }

  moveUp = () => {
    const { active } = this.state
    const isFirstSelected = this.isFirstSelected()
    if (isFirstSelected) {
      return active
    }

    return active.section !== 0 && active.suggestion === 0
      ? {
        section: active.section - DELTA_MOVE,
        suggestion: this.getLastSectionSuggestion(active.section - DELTA_MOVE)
      }
      : {
        section: active.section,
        suggestion: active.suggestion - DELTA_MOVE
      }
  }

  componentDidMount () {
    if (this.state.focus) {
      this.focusInput()
    }

    document.addEventListener('click', this.documentClickHandler, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.documentClickHandler, false)
  }

  componentWillReceiveProps ({ focus }) {
    if (this.state.focus !== focus) {
      this.setState({ focus })
    }
  }

  componentWillUpdate (nextProps, { focus }) {
    if (focus) {
      this.focusInput()
    }
  }

  upDownHandler = (event) => {
    // Never go to negative values or value higher than the list length
    const active = event.key === DOWN
      ? this.moveDown()
      : this.moveUp()
    this.setState({ active })
    event.stopPropagation()
    event.preventDefault()
  }

  enterHandler = () => {
    const {active} = this.state
    const {suggests, withSections} = this.props
    const suggest = withSections ? suggests[active.section].suggestions[active.suggestion] : suggests[active.suggestion]
    if (suggest) {
      const value = suggest.literal || suggest.content
      this.setState({ value })
      this.handleSelect(suggest)
    }
  }

  closeList () {
    this.setState({
      showResultList: false,
      active: null
    })
  }

  documentClickHandler = ({ target }) => {
    const {wrapper} = this
    const isClickOutside = wrapper && !wrapper.contains(target)

    isClickOutside && this.closeList()
  }

  escapeHandler = () => {
    this.closeList()
  }

  focusInput = () => {
    this.input.focus()
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      value,
      active: this.defaultPosition
    })
    this.props.handleChange(value)
  }

  handleClear = () => {
    this.handleChange({
      target: {
        value: ''
      }
    })
    this.focusInput()
  }

  handleSelect = (suggest) => {
    this.setState({
      value: suggest.literal || suggest.content
    })
    this.props.handleSelect(suggest)
  }

  handleKeyDown = (event) => {
    this.setState({
      showResultList: true
    })

    switch (event.key) {
      case UP:
      case DOWN:
        this.upDownHandler(event)
        break
      case ENTER:
        this.enterHandler()
        break
      case ESCAPE:
        this.escapeHandler()
        break
    }
  }

  renderResultList () {
    const { suggests } = this.props
    const { active } = this.state

    return suggests && suggests.length > 0
      ? (
        <ResultsList
          {...this.props}
          handleSelect={this.handleSelect}
          active={active}
          />
        )
      : null
  }

  render () {
    const { handleBlur, handleFocus, placeholder, title } = this.props
    const { value, showResultList } = this.state
    return (
      <div
        className='sui-Autocompleted'
        ref={node => { this.wrapper = node }}
      >
        <input
          className='sui-Autocompleted-input'
          onBlur={handleBlur}
          onChange={this.handleChange}
          onFocus={handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          ref={node => { this.input = node }}
          title={title}
          type='text'
          value={value}
        />
        <span
          className='sui-Autocompleted-clear'
          onClick={this.handleClear}
        />
        {showResultList && this.renderResultList()}
      </div>
    )
  }
}

Autocompleted.propTypes = {
  focus: PropTypes.bool,
  getSectionSuggestions: PropTypes.func,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func,
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

Autocompleted.defaultProps = {
  focus: false,
  initialValue: '',
  selectFirstByDefault: true
}
