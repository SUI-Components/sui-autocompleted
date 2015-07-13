import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {createComponent} from './utilities';
import expect from 'expect';
import Autocompleted from '../src/sui-autocompleted';

describe('sui-autocompleted component test suite', function () {

  describe('loading', function() {
    it('component is loaded properly', function () {
      expect(Autocompleted).toNotBe(undefined);
    });
  });

  describe('sui-autocompleted renders properly', function () {
    let component;

    beforeEach(() => {
      component = createComponent(Autocompleted);
    });

    afterEach(() => {
      component = null;
    });

    it('renders correctly', function() {
      expect(component).toExist();
    });
  });
});
