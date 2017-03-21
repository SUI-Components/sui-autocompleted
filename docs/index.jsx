import React from 'react';
import ReactDom from 'react-dom';
import AutocompletedContainer from './autocompleted-container';
import AutocompletedGithubUserContainer from './autocompleted-githubUsers-container';
import AutocompletedComponentContainer from './autocompleted-component-container';
import AutocompletedWithFocusAndBlur from './autocompleted-focus-and-blur';
import './style.scss';
import '../src/index.scss';

ReactDom.render(<AutocompletedContainer />, document.getElementById('languages'));
ReactDom.render(<AutocompletedGithubUserContainer />, document.getElementById('github-users'));
ReactDom.render(<AutocompletedComponentContainer />, document.getElementById('component-container'));
ReactDom.render(<AutocompletedWithFocusAndBlur />, document.getElementById('component-focus-and-blur'));
