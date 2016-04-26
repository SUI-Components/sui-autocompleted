import React from 'react';
import ResultsList from './results-list';

const FIRST_POSITION = 0;
const DELTA_MOVE = 1;
const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const ENTER = 'Enter';

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

  if(suggest) {
    const value = suggest.literal || suggest.content;
    this.setState({value});
    this.handleSelect(suggest);
  }
};

export default class Autocompleted extends React.Component {

  constructor (props) {
    super(props);

    this.state = {active: FIRST_POSITION, value: props.initialValue || ''};
  }

  handleSelect (suggest) {
    this.setState({value: suggest.literal || suggest.content});
    this.props.handleSelect(suggest);
  }

  handleChange (event) {
    const value = event.target.value;
    this.setState({value, active: FIRST_POSITION});
    this.props.handleChange(value);
  }

  handleKeyDown (event) {
    if (event.key === UP || event.key === DOWN) {
      upDownHandler.bind(this)(event);
    } else if (event.key === ENTER) {
      enterHandler.bind(this)();
    }
  }

  render() {
    const suggests = this.props.suggests;
    const resultList = suggests && suggests.length !== 0 ? (<ResultsList
                                                            {...this.props}
                                                            handleSelect={this.handleSelect.bind(this)}
                                                            active={this.state.active}/>)
                                                        : null;

    return (
      <div className='sui-Autocompleted'>
        <input
          ref='autocompletedInput'
          value={this.state.value}
          placeholder={this.props.placeholder}
          className='sui-Autocompleted-input'
          type='text'
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}/>
        <span
          className='sui-Autocompleted-clear'
          onClick={this.handleChange.bind(this, {target: {value: null}})}></span>
          {resultList}
      </div>
    );
  }
}

Autocompleted.propTypes = {
  placeholder: React.PropTypes.string,
  suggests: React.PropTypes.array.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  initialValue: React.PropTypes.string
};
