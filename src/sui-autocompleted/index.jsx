import React, {Component, PropTypes} from 'react';
import ResultsList from './results-list';

const FIRST_POSITION = 0;
const DELTA_MOVE = 1;
const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const ENTER = 'Enter';
const ESCAPE = 'Escape';

const moveDown = function() {
  const lastPosition = this.props.suggests.length - 1;
  return this.state.active === lastPosition ? this.state.active
                                            : this.state.active + DELTA_MOVE;
};

const moveUp = function() {
  return this.state.active === FIRST_POSITION ? this.state.active
                                              : this.state.active - DELTA_MOVE;
};

const upDownHandler = function(event) {
  // Never go to negative values or value higher than the list length
  const active = event.key === DOWN ? moveDown.bind(this)
                                    : moveUp.bind(this);
  this.setState({active: active()});
  event.stopPropagation();
  event.preventDefault();
};

const enterHandler = function() {
  const suggest = this.props.suggests[this.state.active];

  if (suggest) {
    const value = suggest.literal || suggest.content;
    this.setState({value});
    this.handleSelect(suggest);
  }
};

const escapeHandler = function () {
  this.setState({showResultList: false, active: null});
};

export default class Autocompleted extends Component {

  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      active: FIRST_POSITION,
      value: props.initialValue
    };
  }


  handleChange (event) {
    const value = event.target.value;
    this.setState({value, active: FIRST_POSITION});
    this.props.handleChange(value);
  }

  handleClear () {
    this.handleChange({target: {value: null}});
  }

  handleSelect (suggest) {
    this.setState({value: suggest.literal || suggest.content});
    this.props.handleSelect(suggest);
  }

  handleKeyDown (event) {
    this.setState({showResultList: true});

    switch (event.key) {
      case UP:
      case DOWN:
        upDownHandler.bind(this)(event);
      break;
      case ENTER:
        enterHandler.bind(this)();
      break;
      case ESCAPE:
        escapeHandler.bind(this)();
      break;
    }
  }

  renderResultList () {
    const { suggests } = this.props;
    return suggests && suggests.length > 0
           ? (<ResultsList
               {...this.props}
               handleSelect={this.handleSelect}
               active={this.state.active}/>)
           : null;
  }

  render () {
    return (
      <div className='sui-Autocompleted'>
        <input
          ref='autocompletedInput'
          value={this.state.value}
          placeholder={this.props.placeholder}
          className='sui-Autocompleted-input'
          type='text'
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}/>
        <span
          className='sui-Autocompleted-clear'
          onClick={this.handleClear}></span>
        {this.state.showResultList && this.renderResultList()}
      </div>
    );
  }
}

Autocompleted.propTypes = {
  placeholder: PropTypes.string,
  suggests: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  initialValue: PropTypes.string
};

Autocompleted.defaultProps = {
  initialValue: ''
};
