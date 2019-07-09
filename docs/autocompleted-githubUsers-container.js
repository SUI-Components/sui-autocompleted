/* eslint-disable no-alert, no-console */

import React from 'react'
import {Autocompleted} from '../src'

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
      fetch(`https://api.github.com/search/users?q=${string}`) // eslint-disable-line no-undef
      .then(response => response.json())
      .then(response => response.items.filter(user => user.login.includes(string)))
      .then(users => users.map(user => ({id: user.id, content: user.login, value: user.login})))
      .then(suggests => this.setState({ suggests: suggests }))
      .catch(err => alert(err)) // eslint-disable-line no-alert, no-undef
    } else {
      this.setState({suggests: EMPTY_SUGGESTS})
    }
  }

  handleSelect (suggest) {
    console.log(suggest)
    alert(suggest.content) // eslint-disable-line no-alert, no-undef
    this.setState({suggests: EMPTY_SUGGESTS})
  }

  render () {
    return (
      <Autocompleted
        placeholder='Github users names'
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        suggests={this.state.suggests} />
    )
  }
}
