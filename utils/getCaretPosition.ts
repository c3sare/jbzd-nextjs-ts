const Styles = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "wordWrap",
  "whiteSpace",
  "borderLeftWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
] as const;

function createCopy(textArea: HTMLTextAreaElement) {
  const copy = document.createElement("div");
  copy.textContent = textArea.value;
  const style = getComputedStyle(textArea);
  Styles.forEach(function (key) {
    copy.style[key] = style[key];
  });
  copy.style.overflow = "auto";
  copy.style.width = textArea.offsetWidth + "px";
  copy.style.height = textArea.offsetHeight + "px";
  copy.style.position = "absolute";
  copy.style.left = textArea.offsetLeft + "px";
  copy.style.top = textArea.offsetTop + "px";
  document.body.appendChild(copy);
  return copy;
}

export function getCaretPosition(
  textArea: HTMLTextAreaElement,
  selectionPosition: number
) {
  const start = textArea.selectionStart;
  const end = textArea.selectionEnd;
  const copy = createCopy(textArea);
  const copy2 = createCopy(textArea);
  const range = document.createRange();
  const range2 = document.createRange();
  if (copy.firstChild) {
    range.setStart(copy.firstChild as Node, selectionPosition);
    range.setEnd(copy.firstChild as Node, selectionPosition);
  }
  if (copy2.firstChild) {
    range2.setStart(copy2.firstChild as Node, 0);
    range2.setEnd(copy2.firstChild as Node, 0);
  }
  const selection = document.getSelection()!;
  selection.removeAllRanges();
  selection.addRange(range);
  const rect = range.getBoundingClientRect();
  const rect2 = range2.getBoundingClientRect();
  document.body.removeChild(copy);
  document.body.removeChild(copy2);
  textArea.selectionStart = start;
  textArea.selectionEnd = end;
  textArea.focus();
  return {
    x: rect.left - rect2.left - textArea.scrollLeft,
    y: rect.top - rect2.top - textArea.scrollTop,
  };
}
