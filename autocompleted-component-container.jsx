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

class SuggestItem extends React.Component {
  render(){
    return (<p className='sui-SuggestItem'>{this.props.text}</p>)
  }
}

export default class AutocompletedComponentContainer extends React.Component {
  constructor() {
    super();
    this.state = {suggests: EMPTY_SUGGESTS};
  }

  handleChange(string) {
    if (string) {
      this.setState({
        suggests: suggests.filter(suggest => suggest.content.includes(string))
                          .map((object) => ({...object, literal: object.content, content: (<SuggestItem text={object.content}/>)}))
      });
    } else {
      this.setState({suggests: EMPTY_SUGGESTS});
    }
  }

  handleSelect(suggest) {
    alert(`Selected item: ${suggest.literal}`);
    this.setState({suggests: EMPTY_SUGGESTS});
  }

  render() {
    return (
      <Autocompleted
          placeholder='Components container'
          handleChange={this.handleChange.bind(this)}
          handleSelect={this.handleSelect.bind(this)}
          suggests={this.state.suggests}/>
    );
  }
}

