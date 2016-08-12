/* eslint no-alert:0 */

import React from 'react';
import {Autocompleted} from '../src';

const EMPTY_SUGGESTS = [];

export default class AutocompletedContainer extends React.Component {
  constructor() {
    super();
    this.state = {suggests: EMPTY_SUGGESTS};
  }

  handleChange(string) {
    if (string) {
      fetch(`https://api.github.com/search/users?q=${string}`)
      .then(response => response.json())
      .then(response => response.items.filter(user => user.login.includes(string)))
      .then(users => users.map(user => ({id: user.id, content: user.login, value: user.login})))
      .then(suggests => this.setState({ suggests: suggests }))
      .catch(err => alert(err));

    } else {
      this.setState({suggests: EMPTY_SUGGESTS});
    }
  }

  handleSelect(suggest) {
    console.log(suggest);
    alert( suggest.content );
    this.setState({suggests: EMPTY_SUGGESTS});
  }


  render() {
    return (
      <Autocompleted
          placeholder='Github users names'
          handleChange={this.handleChange.bind(this)}
          handleSelect={this.handleSelect.bind(this)}
          suggests={this.state.suggests}/>
    );
  }
}
