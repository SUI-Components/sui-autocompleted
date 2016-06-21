import 'babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import AutocompletedContainer from './autocompleted-container';
import AutocompletedGithubUserContainer from './autocompleted-githubUsers-container';
import AutocompletedComponentContainer from './autocompleted-component-container';
import AutocompletedWordSuggestionContainer from './autocompleted-wordSuggestion-container';
import './style.scss';
import '../src/index.scss';

ReactDom.render(<AutocompletedContainer />, document.getElementById('languages'));
ReactDom.render(<AutocompletedGithubUserContainer />, document.getElementById('github-users'));
ReactDom.render(<AutocompletedComponentContainer />, document.getElementById('component-container'));
ReactDom.render(<AutocompletedWordSuggestionContainer  />, document.getElementById('component-word-container'));
