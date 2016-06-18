import React from 'react';
import ResultsList from './results-list';
import WordSuggestionList from './word-suggestion-list';
import Keyboard from './utils/keyboard'

import caret from "./utils/caret";

const FIRST_POSITION = 0;
const DELTA_MOVE = 1;

const textInputContentForWordSuggestion = function (event) {
  return textInputContentForWordSuggestionInField.bind(this)(event.target);
};

const textInputContentForWordSuggestionInField = function (field) {
  const caretPosition = caret(field);
  const fullText = field.value;
  const wordArray = fullText.split(" ");
  const currentWordIndex = (fullText.substring(0, caretPosition).split(' ') || []).length - 1;

  return { text: fullText, word: wordArray[currentWordIndex], wordIndex: currentWordIndex };
};

const moveDown = function() {
  const lastPosition = this.props.suggests.length - 1;
  return this.state.active === lastPosition ? this.state.active
                                            : this.state.active + DELTA_MOVE;
};

const moveUp = function() {
  return this.state.active === FIRST_POSITION ? this.state.active
                                              : this.state.active - DELTA_MOVE;
};

const moveLeft = function () {
  if (this.state.activeWord == null) {
    return FIRST_POSITION;
  }

  return this.state.activeWord === FIRST_POSITION ? this.state.activeWord : this.state.activeWord - DELTA_MOVE;
};

const moveRight = function () {
  if (this.state.activeWord == null) {
    return FIRST_POSITION;
  }

  const lastPosition = this.props.wordSuggestions.length - 1;
  return this.state.activeWord === lastPosition ? this.state.activeWord : this.state.activeWord + DELTA_MOVE;
};

const upDownHandler = function(event) {
  // Never go to negative values or value higher than the list length
  const active = event.key === Keyboard.DOWN ? moveDown.bind(this)
                                    : moveUp.bind(this);
  this.setState({active: active()});
  event.stopBubbling();
};

const leftRightHandler = function (event) {
  if (this.state.showWordSuggestions && this.props.wordSuggestions && this.props.wordSuggestions.length > 0) {
    const active = event.key === Keyboard.LEFT ? moveLeft.bind(this) : moveRight.bind(this);
    this.setState({ activeWord: active() });
    event.stopBubbling();
  }
};

const enterHandler = function() {
  const suggest = this.props.suggests[this.state.active];

  if(suggest) {
    const value = suggest.literal || suggest.content;
    this.setState({value});
    this.handleSelect(suggest);
  }
};

const escapeHandler = function () {
  this.setState({showResultList: false, showWordSuggestions: false, active: null, activeWord: null });
};

const spaceHandler = function (event) {
  const wordContext = textInputContentForWordSuggestion(event);
  if (!this.shouldDispatchWordSuggestions(wordContext)) {
    return this.hideWordSuggestions();
  }
  const wordSuggestionObject = this.props.wordSuggestions[this.state.activeWord];

  if (!wordSuggestionObject) {
    return this.hideWordSuggestions();
  }

  dispatchWordContext.bind(this)(wordContext, wordSuggestionObject);
};

const dispatchWordContext = function (wordContext, wordSuggestionObject) {
  const wordIndex = wordContext.wordIndex;
  const textArray = wordContext.text.split(' ');

  textArray[wordIndex] = wordSuggestionObject.literal || wordSuggestionObject.content;

  this.setState({ value: textArray.reduce((initial, value) => initial + " " + value) });
  this.hideWordSuggestions();
  event.stopBubbling();
};

export default class Autocompleted extends React.Component {
  constructor (props) {
    super(props);

    this.state = {active: FIRST_POSITION, activeWord: null, value: props.initialValue || ''};
  }

  hideWordSuggestions() {
    this.setState({showWordSuggestions: false});
  }

  shouldDispatchWordSuggestions(wordContext) {
    return wordContext.word.trim() != ' ' && this.state.showWordSuggestions && this.props.wordSuggestions && this.props.wordSuggestions.length > 0;
  }

  handleSelect (suggest) {
    this.setState({value: suggest.literal || suggest.content});
    this.props.handleSelect(suggest);
  }

  handleWordSuggestionSelect (word) {
    const inputText = this.refs.autocompletedInput;
    const wordContext = textInputContentForWordSuggestionInField(inputText);
    dispatchWordContext.bind(this)(wordContext, word);
  }

  handleChange (event) {
    const value = event.target.value;
    this.setState({value, active: FIRST_POSITION});
    this.props.handleChange(value);
    var eventContext = textInputContentForWordSuggestion(event);
    if (eventContext.word.trim() != '') {
      const wordSuggestionFunction = (this.props.handleWordSuggestion || function () {});
      wordSuggestionFunction(eventContext.text, eventContext.word);
    }
  }

  handleKeyDown (event) {
    var kb = new Keyboard(event);
    kb.on([Keyboard.UP, Keyboard.DOWN], upDownHandler.bind(this))
      .on([Keyboard.LEFT, Keyboard.RIGHT], leftRightHandler.bind(this))
      .on([Keyboard.ENTER], enterHandler.bind(this))
      .on([Keyboard.ESCAPE], escapeHandler.bind(this))
      .on([Keyboard.SPACE], spaceHandler.bind(this))
      .otherwise(() => this.setState({showResultList: true, showWordSuggestions: true}));
  }

  render() {
    const suggests = this.props.suggests;
    const wordSuggestion = this.props.wordSuggestions;
    const wordSuggestionList = wordSuggestion && wordSuggestion.length !== 0 ?
      (<WordSuggestionList
        {...this.props}
          handleSelect={this.handleWordSuggestionSelect.bind(this)}
          active={this.state.activeWord}
        />
    ) : null;

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
          { this.state.showWordSuggestions && wordSuggestionList }
          { this.state.showResultList && resultList}
      </div>
    );
  }
}

Autocompleted.propTypes = {
  placeholder: React.PropTypes.string,
  suggests: React.PropTypes.array.isRequired,
  wordSuggestions: React.PropTypes.array,
  handleChange: React.PropTypes.func.isRequired,
  handleSelect: React.PropTypes.func.isRequired,
  handleWordSuggestion: React.PropTypes.func,
  initialValue: React.PropTypes.string
};
