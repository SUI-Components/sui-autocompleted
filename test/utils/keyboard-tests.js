import Keyboard from "../../src/sui-autocompleted/utils/keyboard";
import {success, fail} from "../test-utilities/assertions";

const exerciseKeyboardEvent = function (value) {
  return { key: value };
};

const exerciseKeyboard = function (event) {
  return new Keyboard(event)
};

describe("Keyboard", function () {
  const arrowUpEvent = exerciseKeyboardEvent(Keyboard.UP);

  describe("on keypress", function () {
    it("should dispatch the callback for the matching event", function () {
      exerciseKeyboard(arrowUpEvent)
        .on(Keyboard.UP, success)
        .otherwise(fail);
    });

    it("should dispatch the callback for an otherwise event if there are no matches", function () {
      exerciseKeyboard(arrowUpEvent)
        .on(Keyboard.DOWN, fail)
        .otherwise(success);
    });

    it("should not dispatch ignored events", function () {
      exerciseKeyboard(arrowUpEvent)
        .ignore(Keyboard.UP)
        .otherwise(fail);
    });
  });
});
