import React from 'react';
import ListItem from './list-item';

export default class WordSuggestionList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className='sui-Autocompleted-word-suggestion-results'>
        {
          this.props.wordSuggestions.map((suggest, index) => {
            return (<ListItem {...this.props} key={suggest.id} item={suggest} isActive={index === this.props.active}/>);
          })
        }
      </ul>
    );
  }
}

WordSuggestionList.propTypes = {
  suggests: React.PropTypes.array.isRequired,
  active: React.PropTypes.number
};
