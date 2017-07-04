import React, {Component, PropTypes} from 'react'
import ResultsList from './results-list'

const DELTA_MOVE = 1
const UP = 'ArrowUp'
const DOWN = 'ArrowDown'
const ENTER = 'Enter'
const ESCAPE = 'Escape'

export default class Autocompleted extends Component {
  constructor (...args) {
    super(...args)

    const { selectFirstByDefault, initialValue, focus } = this.props

    this.input = null
    this.defaultPosition = selectFirstByDefault ? 0 : -1
    this.documentClickHandler = this.documentClickHandler.bind(this)
    this.moveDown = this.moveDown.bind(this)
    this.moveUp = this.moveUp.bind(this)
    this.upDownHandler = this.upDownHandler.bind(this)
    this.enterHandler = this.enterHandler.bind(this)
    this.escapeHandler = this.escapeHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.focusInput = this.focusInput.bind(this)

    this.state = {
      active: this.defaultPosition,
      value: initialValue,
      showResultList: false,
      focus: focus
    }
  }

  moveDown () {
    const { active } = this.state
    const lastPosition = this.props.suggests.length - 1
    return active === lastPosition
      ? active
      : active + DELTA_MOVE
  }

  moveUp () {
    const { active } = this.state
    return active === this.defaultPosition
      ? active
      : active - DELTA_MOVE
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

  upDownHandler (event) {
    // Never go to negative values or value higher than the list length
    const active = event.key === DOWN
      ? this.moveDown()
      : this.moveUp()
    this.setState({ active })
    event.stopPropagation()
    event.preventDefault()
  }

  enterHandler () {
    const suggest = this.props.suggests[this.state.active]

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

  documentClickHandler (event) {
    const {target} = event
    const {wrapper} = this
    const isClickOutside = !wrapper.contains(target)

    isClickOutside && this.closeList()
  }

  escapeHandler () {
    this.closeList()
  }

  focusInput () {
    this.input.focus()
  }

  handleChange (event) {
    const value = event.target.value
    this.setState({
      value,
      active: this.defaultPosition
    })
    this.props.handleChange(value)
  }

  handleClear () {
    this.handleChange({
      target: {
        value: ''
      }
    })
    this.focusInput()
  }

  handleSelect (suggest) {
    this.setState({
      value: suggest.literal || suggest.content
    })
    this.props.handleSelect(suggest)
  }

  handleKeyDown (event) {
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
    const { placeholder, handleFocus, handleBlur } = this.props
    const { value, showResultList } = this.state
    return (
      <div
        className='sui-Autocompleted'
        ref={node => { this.wrapper = node }}
      >
        <input
          ref={node => { this.input = node }}
          value={value}
          placeholder={placeholder}
          className='sui-Autocompleted-input'
          type='text'
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func,
  handleClear: PropTypes.func,
  handleSelect: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  suggests: PropTypes.array.isRequired,
  selectFirstByDefault: PropTypes.bool,
  focus: PropTypes.bool
}

Autocompleted.defaultProps = {
  initialValue: '',
  selectFirstByDefault: true,
  focus: false
}
