/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

var noop = function noop() {};

export default function ListItem(_ref) {
  var content = _ref.content,
      _ref$handleSelect = _ref.handleSelect,
      handleSelect = _ref$handleSelect === void 0 ? noop : _ref$handleSelect,
      isActive = _ref.isActive,
      isSection = _ref.isSection,
      item = _ref.item;
  var classes = cx({
    'sui-Autocompleted-item': !isSection,
    'sui-Autocompleted-section': isSection,
    'sui-Autocompleted-item--active': isActive
  });
  return React.createElement("li", {
    className: classes,
    onClick: handleSelect.bind(null, item)
  }, content);
}