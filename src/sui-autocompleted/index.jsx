import React from 'react';
import ResultsList from './results-list';
import WordSuggestionList from './word-suggestion-list';
import Keyboard from './utils/keyboard'
import Caret from "./utils/caret";
import ListSelector from "./utils/list-selector";


export default class Autocompleted extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.initialValue || '',
      wordSelector: new ListSelector(),
      suggestionSelector: new ListSelector()
    };
  }

  nextSuggestion(event) {
    this.setState({ suggestionSelector: this.state.suggestionSelector.selectNext(event.stopBubbling) });
  }

  previousSuggestion(event) {
    this.setState({ suggestionSelector: this.state.suggestionSelector.selectPrevious(event.stopBubbling) });
  }

  selectSuggestion() {
    this.handleSelect(this.state.suggestionSelector.selectedValue());
  }

  handleSelect (option) {
    this.setState({ value: option.literal || option.content });
    this.hideAllSuggestions();
  }

  nextWord(event) {
    this.setState({ wordSelector: this.state.wordSelector.selectNext(event.stopBubbling) });
  }

  previousWord(event) {
    this.setState({ wordSelector: this.state.wordSelector.selectPrevious(event.stopBubbling) });
  }

  selectWord(event) {
    const wordContext = Caret.matchEvent(event);
    if (!this.state.showWordSuggestions) {
      return this.hideAllSuggestions();
    }
    const wordSuggestionObject = this.state.wordSelector.selectedValue();

    if (!wordSuggestionObject) {
      return this.hideAllSuggestions();
    }

    this.handleSelectWord(wordContext, wordSuggestionObject);
  }

  handleSelectWord(selectionContext, wordSuggestion) {
    const wordIndex = selectionContext.wordIndex;
    const textArray = selectionContext.text.split(' ');

    textArray[wordIndex] = wordSuggestion.literal || wordSuggestion.content;

    this.setState({ value: textArray.reduce((initial, value) => initial + " " + value) });
    this.hideAllSuggestions();
  }

  handleWordSuggestionSelect (word) {
    const inputText = this.refs.autocompletedInput;
    const wordContext = Caret.matchField(inputText);
    this.handleSelectWord(wordContext, word);
    this.refs.autocompletedInput.focus();
  }

  hideAllSuggestions() {
    this.setState({showWordSuggestions: false, showResultList: false});
  }

  handleChange (event) {
    const value = event.target.value;
    this.setState({ value });
    this.props.handleChange(value);
    var eventContext = Caret.matchEvent(event);
    if (eventContext.word.trim() != '') {
      const wordSuggestionFunction = (this.props.handleWordSuggestion || function () {});
      wordSuggestionFunction(eventContext.text, eventContext.word);
    }
  }

  handleKeyDown (event) {
    var kb = new Keyboard(event);
    kb.on([Keyboard.DOWN], this.nextSuggestion.bind(this))
      .on([Keyboard.UP], this.previousSuggestion.bind(this))
      .on([Keyboard.RIGHT], this.nextWord.bind(this))
      .on([Keyboard.LEFT], this.previousWord.bind(this))
      .on([Keyboard.ENTER], this.selectSuggestion.bind(this))
      .on([Keyboard.ESCAPE], this.hideAllSuggestions.bind(this))
      .on([Keyboard.SPACE], this.selectWord.bind(this))
      .ignore([Keyboard.CONTROL, Keyboard.SHIFT])
      .otherwise(() => this.setState({showResultList: true, showWordSuggestions: true}));
  }

  render() {
    this.state.suggestionSelector = this.state.suggestionSelector.containing(this.props.suggests);
    this.state.wordSelector = this.state.wordSelector.containing(this.props.wordSuggestions);

    const wordSuggestionList = this.state.wordSelector.canSelect() ?
      (<WordSuggestionList
        {...this.props}
          wordSuggestions={this.state.wordSelector.allValues()}
          handleSelect={this.handleWordSuggestionSelect.bind(this)}
          active={this.state.wordSelector.selectedIndex()}
        />
    ) : null;

    const resultList = this.state.suggestionSelector.canSelect() ?
      (<ResultsList
        {...this.props}
          suggests={this.state.suggestionSelector.allValues()}
          handleSelect={this.handleSelect.bind(this)}
          active={this.state.suggestionSelector.selectedIndex()}/>
    ) : null;

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
          onClick={this.handleChange.bind(this, {target: {value: ''}})}></span>
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
