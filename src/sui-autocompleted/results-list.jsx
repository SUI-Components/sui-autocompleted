import React from 'react';
import ListItem from './list-item';

export default class ResultsList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className='sui-Autocompleted-results'>
        {
          this.props.suggests.map((suggest, index) => {
            return (<ListItem {...this.props} key={suggest.id} item={suggest} isActive={index === this.props.active}/>);
          })
        }
      </ul>
    );
  }
}

ResultsList.propTypes = {
  suggests: React.PropTypes.array.isRequired,
  active: React.PropTypes.number
};
