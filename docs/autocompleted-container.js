import React from 'react'
import {Autocompleted} from '../src'
import suggests from './mock_suggests'

const EMPTY_SUGGESTS = []

export default class AutocompletedContainer extends React.Component {
  constructor () {
    super()
    this.state = {suggests: EMPTY_SUGGESTS}
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange (string) {
    if (string) {
      this.setState({
        suggests: suggests.filter(suggest => suggest.content.includes(string))
      })
    } else {
      this.setState({suggests: EMPTY_SUGGESTS})
    }
  }

  handleSelect (suggest) {
    alert(`Selected item: ${suggest.content}`) // eslint-disable-line no-alert, no-undef
    this.setState({suggests: EMPTY_SUGGESTS})
  }

  render () {
    return (
      <Autocompleted
        placeholder='Programming Laguages'
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        suggests={this.state.suggests}
        selectFirstByDefault={false}
      />
    )
  }
}
