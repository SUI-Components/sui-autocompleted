/* eslint no-alert:0 */

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

export default class AutocompletedContainer extends React.Component {
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

  handleSelect(suggest) {
    alert(`Selected item: ${suggest.content}`);
    this.setState({suggests: EMPTY_SUGGESTS});
  }

  render() {
    return (
      <Autocompleted
          placeholder='Programming Laguages'
          handleChange={this.handleChange.bind(this)}
          handleSelect={this.handleSelect.bind(this)}
          suggests={this.state.suggests}/>
    );
  }
}
