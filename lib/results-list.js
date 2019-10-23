import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './list-item';
export default function ResultsList(_ref) {
  var active = _ref.active,
      getSectionSuggestions = _ref.getSectionSuggestions,
      handleSelect = _ref.handleSelect,
      renderSection = _ref.renderSection,
      renderSuggestion = _ref.renderSuggestion,
      suggests = _ref.suggests,
      withSections = _ref.withSections;

  var renderSuggestions = function renderSuggestions(_ref2) {
    var items = _ref2.items,
        _ref2$sectionIndex = _ref2.sectionIndex,
        sectionIndex = _ref2$sectionIndex === void 0 ? 0 : _ref2$sectionIndex;
    return items.map(function (suggest, index) {
      return React.createElement(ListItem, {
        content: suggest.content || renderSuggestion(suggest),
        isActive: active && sectionIndex === active.section && index === active.suggestion,
        item: suggest,
        key: suggest.id || index,
        handleSelect: handleSelect
      });
    });
  };

  return React.createElement("ul", {
    className: "sui-Autocompleted-results"
  }, withSections ? suggests.map(function (item, sectionIndex) {
    var content = renderSection(item.section);
    return React.createElement(React.Fragment, null, content && React.createElement(ListItem, {
      content: content,
      isSection: true,
      item: item,
      key: "section" + item.section
    }), renderSuggestions({
      items: getSectionSuggestions(item),
      sectionIndex: sectionIndex
    }));
  }) : renderSuggestions({
    items: suggests
  }));
}