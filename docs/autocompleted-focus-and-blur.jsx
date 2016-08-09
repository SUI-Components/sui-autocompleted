/* eslint no-alert:0 no-console: 0 */

import React from 'react';
import {Autocompleted} from '../src';

const EMPTY_SUGGESTS = [];
const suggests = [
{
  id: 0,
  value: 'ruby',
  content: 'ruby'
}, {
  id: 1,
  value: 'javascript',
  content: 'javascript'
}, {
  id: 2,
  value: 'php',
  content: 'php'
}, {
  id: 3,
  value: 'java',
  content: 'java'
}, {
  id: 4,
  value: 'HipHophp',
  content: 'HipHophp'
}
];

export default class AutocompletedWithFocusAndBlur extends React.Component {
  constructor() {
    super();
    this.state = {suggests: EMPTY_SUGGESTS};
  }

  handleChange(string) {
    if (string) {
      this.setState({
        suggests: suggests.filter(suggest => suggest.content.includes(string))
      });
    } else {
      this.setState({suggests: EMPTY_SUGGESTS});
    }
  }

  handleWordSuggestion(text, word) {
    this.setState({ wordSuggestions: suggests.filter(suggest => suggest.content.includes(word)) });
  }

  handleSelect(suggest) {
    alert(`Selected item: ${suggest.content}`);
    this.setState({suggests: EMPTY_SUGGESTS});
  }

  handleFocus() {
    console.log('Focus');
  }

  handleBlur() {
    console.log('Blur');
  }

  render() {
    return (
      <Autocompleted
        placeholder='Autocomplete With Focus and Blur'
        handleChange={this.handleChange.bind(this)}
        handleFocus={this.handleFocus.bind(this)}
        handleBlur={this.handleBlur.bind(this)}
        handleSelect={this.handleSelect.bind(this)}
        handleWordSuggestion={this.handleWordSuggestion.bind(this)}
        wordSuggestions={this.state.wordSuggestions}
        suggests={this.state.suggests}/>
    );
  }
}
