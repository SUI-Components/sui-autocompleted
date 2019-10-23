import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ResultsList from './results-list';
var DELTA_MOVE = 1;
var DOWN = 'ArrowDown';
var ENTER = 'Enter';
var ESCAPE = 'Escape';
var UP = 'ArrowUp';

var noop = function noop() {};

export function Autocompleted(_ref) {
  var focus = _ref.focus,
      _ref$getSectionSugges = _ref.getSectionSuggestions,
      getSectionSuggestions = _ref$getSectionSugges === void 0 ? noop : _ref$getSectionSugges,
      _ref$handleBlur = _ref.handleBlur,
      handleBlur = _ref$handleBlur === void 0 ? noop : _ref$handleBlur,
      _ref$handleChange = _ref.handleChange,
      handleChange = _ref$handleChange === void 0 ? noop : _ref$handleChange,
      _ref$handleFocus = _ref.handleFocus,
      handleFocus = _ref$handleFocus === void 0 ? noop : _ref$handleFocus,
      _ref$handleSelect = _ref.handleSelect,
      handleSelect = _ref$handleSelect === void 0 ? noop : _ref$handleSelect,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? '' : _ref$initialValue,
      placeholder = _ref.placeholder,
      _ref$renderSection = _ref.renderSection,
      renderSection = _ref$renderSection === void 0 ? noop : _ref$renderSection,
      _ref$renderSuggestion = _ref.renderSuggestion,
      renderSuggestion = _ref$renderSuggestion === void 0 ? noop : _ref$renderSuggestion,
      _ref$selectFirstByDef = _ref.selectFirstByDefault,
      selectFirstByDefault = _ref$selectFirstByDef === void 0 ? true : _ref$selectFirstByDef,
      suggests = _ref.suggests,
      title = _ref.title,
      withSections = _ref.withSections;
  var defaultPosition = selectFirstByDefault ? {
    section: 0,
    suggestion: 0
  } : -1;

  var _useState = useState(defaultPosition),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = useState(false),
      showResultList = _useState2[0],
      setShowResultList = _useState2[1];

  var _useState3 = useState(initialValue),
      value = _useState3[0],
      setValue = _useState3[1];

  var input = useRef(null);
  var wrapper = useRef(null);
  useEffect(function () {
    function documentClickHandler(_ref2) {
      var target = _ref2.target;
      var isClickOutside = wrapper.current && !wrapper.current.contains(target);
      isClickOutside && closeList();
    }

    document.addEventListener('click', documentClickHandler, false);
    return function () {
      return document.removeEventListener('click', documentClickHandler, false);
    };
  }, []);
  useEffect(function () {
    if (focus) {
      input.current && input.current.focus();
    }
  }, [focus]);

  var focusInput = function focusInput() {
    input.current.focus();
  };

  var closeList = function closeList() {
    setActive(null);
    setShowResultList(false);
  };

  var isLastSelected = function isLastSelected() {
    var lastIndex = suggests.length - 1;
    var lastSection = withSections ? lastIndex : 0;
    var lastPosition = withSections ? suggests[lastIndex].suggestions.length - 1 : lastIndex;
    return active.section === lastSection && active.suggestion === lastPosition;
  };

  var isFirstSelected = function isFirstSelected() {
    return active.section === defaultPosition.section && active.suggestion === defaultPosition.suggestion;
  };

  var getLastSectionSuggestion = function getLastSectionSuggestion(section) {
    return withSections ? suggests[section].suggestions.length - 1 : suggests.length - 1;
  };

  var moveDown = function moveDown() {
    if (isLastSelected()) {
      return active;
    }

    return active.suggestion === getLastSectionSuggestion(active.section) ? {
      section: active.section + DELTA_MOVE,
      suggestion: 0
    } : {
      section: active.section,
      suggestion: active.suggestion + DELTA_MOVE
    };
  };

  var moveUp = function moveUp() {
    if (isFirstSelected()) {
      return active;
    }

    return active.section !== 0 && active.suggestion === 0 ? {
      section: active.section - DELTA_MOVE,
      suggestion: getLastSectionSuggestion(active.section - DELTA_MOVE)
    } : {
      section: active.section,
      suggestion: active.suggestion - DELTA_MOVE
    };
  };

  var upDownHandler = function upDownHandler(event) {
    // Never go to negative values or value higher than the list length
    var activeItem = event.key === DOWN ? moveDown() : moveUp();
    setActive(activeItem);
    event.stopPropagation();
    event.preventDefault();
  };

  var enterHandler = function enterHandler() {
    var suggest = withSections ? suggests[active.section].suggestions[active.suggestion] : suggests[active.suggestion];

    if (suggest) {
      var selectedValue = suggest.literal || suggest.content;
      setValue(selectedValue);
      handleSelect(suggest);
    }
  };

  var escapeHandler = function escapeHandler() {
    closeList();
  };

  var handleSuggestChange = function handleSuggestChange(event) {
    var item = event.target.value;
    setValue(item);
    setActive(defaultPosition);
    handleChange(item);
  };

  var handleListClear = function handleListClear() {
    handleSuggestChange({
      target: {
        value: ''
      }
    });
    focusInput();
  };

  var handleSuggestSelect = function handleSuggestSelect(suggest) {
    setValue(suggest.literal || suggest.content);
    handleSelect(suggest);
  };

  var handleKeyDown = function handleKeyDown(event) {
    setShowResultList(true);

    switch (event.key) {
      case UP:
      case DOWN:
        upDownHandler(event);
        break;

      case ENTER:
        enterHandler();
        break;

      case ESCAPE:
        escapeHandler();
        break;
    }
  };

  var renderResultList = function renderResultList() {
    return suggests && suggests.length > 0 ? React.createElement(ResultsList, {
      active: active,
      getSectionSuggestions: getSectionSuggestions,
      renderSection: renderSection,
      renderSuggestion: renderSuggestion,
      suggests: suggests,
      withSections: withSections,
      handleSelect: handleSuggestSelect
    }) : null;
  };

  return React.createElement("div", {
    className: "sui-Autocompleted",
    ref: wrapper
  }, React.createElement("input", {
    className: "sui-Autocompleted-input",
    onBlur: handleBlur,
    onChange: handleSuggestChange,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    placeholder: placeholder,
    ref: input,
    title: title,
    type: "text",
    value: value
  }), React.createElement("span", {
    className: "sui-Autocompleted-clear",
    onClick: handleListClear
  }), showResultList && renderResultList());
}