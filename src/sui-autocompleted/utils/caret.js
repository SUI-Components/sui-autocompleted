export default function caret (field) {

  var iCaretPos = 0;

  if (document.selection) {
    field.focus();
    var oSel = document.selection.createRange();
    oSel.moveStart('character', -field.value.length);
    iCaretPos = oSel.text.length;
  }

  else if (field.selectionStart || field.selectionStart == '0') {
    iCaretPos = field.selectionStart;
  }

  return iCaretPos;
}
