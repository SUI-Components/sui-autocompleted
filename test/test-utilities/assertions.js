import expect from "expect";

export default {
  fail: function () {
    expect(false).toExist();
  },

  success: function () {
    expect(true).toExist();
  }
};
