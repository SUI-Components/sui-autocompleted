import React from 'react';
import cx from 'classnames';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = cx({
      'sui-Autocompleted-item': true,
      'sui-Autocompleted-item--active': this.props.isActive
    });
    return (
      <li
        className={classes}
        onClick={this.props.handleSelect.bind(null, this.props.item)}>
          {this.props.item.content}
      </li>
    );
  }
}

ListItem.propTypes = {
  item: React.PropTypes.object,
  handleSelect: React.PropTypes.func,
  isActive: React.PropTypes.bool
};
