import React from 'react'; // eslint-disable-line no-unused-vars
import {createComponent} from './test-utilities';
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

    describe('props.initialValue', function () {
      it('must set the initial value of the input text on construction', function () {
        const expectedValue = 'Hello world!';
        component = createComponent(Autocompleted, { initialValue: expectedValue });
        const inputValue = component.props.children[0].props.value;
        expect(inputValue).toEqual(expectedValue);
      });
    });
  });
});
