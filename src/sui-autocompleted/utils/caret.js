function caret (field) {

  var iCaretPos = 0;

  if (document.selection) {
    field.focus();
    var oSel = document.selection.createRange();
    oSel.moveStart('character', -field.value.length);
    iCaretPos = oSel.text.length;
  }

  else if (field.selectionStart || field.selectionStart === '0') {
    iCaretPos = field.selectionStart;
  }

  return iCaretPos;
}

export default class Caret {
  static matchField(field) {
    const caretPosition = caret(field);
    const fullText = field.value;
    const wordArray = fullText.split(' ');
    const currentWordIndex = (fullText.substring(0, caretPosition).split(' ') || []).length - 1;

    return { text: fullText, word: wordArray[currentWordIndex], wordIndex: currentWordIndex };
  }

  static matchEvent(event) {
    return Caret.matchField(event.target);
  }
}
