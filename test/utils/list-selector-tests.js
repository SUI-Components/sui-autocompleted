import ListSelector from '../../src/sui-autocompleted/utils/list-selector';
import expect from 'expect';

const OTHER_ARRAY = ['a', 'b'];
const SMALL_ARRAY = ['a'];

const exerciseSelector = function ({ data, initial }) {
  return new ListSelector(data || ['java', 'javascript'], initial);
};

describe('ListSelector', function () {
  describe('containing', function () {
    it("should replace the current contents of the selector", function () {
      const selector = exerciseSelector({}).containing(OTHER_ARRAY);
      expect(selector.allValues()).toEqual(OTHER_ARRAY);
    });

    it("should move the selector index to the last element if the new content is smaller", function () {
      const selector = exerciseSelector({ initial: 1 }).containing(SMALL_ARRAY);
      expect(selector.selectedIndex()).toBe(0);
    });
  });

  describe('selectNext', function () {
    it('should select the next value if any', function () {
      const selector = exerciseSelector({}).selectNext();
      expect(selector.selectedValue()).toEqual('javascript');
    });
  });

  describe('selectPrevious', function () {
    it('should select the previous value if any', function () {
      const selector = exerciseSelector({ initial: 1 }).selectPrevious();
      expect(selector.selectedValue()).toEqual('java');
    });
  });

  describe("canSelect", function () {
    it('should be true if there is a selector', function () {
      const selector = exerciseSelector({});
      expect(selector.canSelect()).toExist();
    });

    it('should be false if there isn\'t any selector', function () {
      const selector = exerciseSelector({ data: [] });
      expect(selector.canSelect()).toNotExist();
    });
  });
});
