import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Autocompleted} from '../src'
import suggests from './mock_suggests'

const EMPTY_SUGGESTS = []

function SuggestItem ({text}) {
  return (<p className='sui-SuggestItem'>{text}</p>)
}

SuggestItem.propTypes = {
  text: PropTypes.string
}

export default class AutocompletedComponentContainer extends Component {
  constructor () {
    super()
    this.state = {suggests: EMPTY_SUGGESTS}
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange (string) {
    let newSuggests = EMPTY_SUGGESTS
    if (string) {
      newSuggests = suggests
                    .filter(suggest => suggest.content.includes(string))
                    .map(object => ({
                      ...object,
                      literal: object.content,
                      content: (<SuggestItem text={object.content} />)
                    }))
    }
    this.setState({suggests: newSuggests})
  }

  handleSelect (suggest) {
    alert(`Selected item: ${suggest.literal}`) // eslint-disable-line no-alert, no-undef
    this.setState({suggests: EMPTY_SUGGESTS})
  }

  render () {
    return (
      <Autocompleted
        placeholder='Components container'
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        suggests={this.state.suggests} />
    )
  }
}
