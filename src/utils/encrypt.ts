import getASCII from "./get-ascii";
import getWordshiftOffset from "./get-wordshift-offset";
import { _reorderStringIndexWrap } from "./helper";
import { isLetter, isLowerCaseLetter } from "./is-letter";

function reorderString(input: string, wordshiftOffset: number): string {
  let frontIndex = wordshiftOffset % input.length;
  let backIndex = frontIndex - 1;
  let isFrontTurn = true;
  let reorderedString = "";
  let frontMeetBack = false;

  while (true) {
    if (frontIndex === backIndex) {
      frontMeetBack = true;
    }

    const { fIdx, bIdx } = _reorderStringIndexWrap(
      frontIndex,
      backIndex,
      input.length
    );

    frontIndex = fIdx;
    backIndex = bIdx;

    if (isFrontTurn) {
      reorderedString += input[frontIndex];
      frontIndex++;
    } else {
      reorderedString += input[backIndex];
      backIndex--;
    }

    isFrontTurn = !isFrontTurn;

    if (frontMeetBack) {
      break;
    }
  }

  return reorderedString;
}

function shiftString(input: string, wordshiftOffset: number): string {
  let finalString = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const asciiChar = getASCII(char);
    if (isLetter(char)) {
      const base = isLowerCaseLetter(char) ? getASCII("a") : getASCII("A");
      const shiftedCharCode =
        ((asciiChar - base + wordshiftOffset + i + 1) % 26) + base;
      const shiftedChar = String.fromCharCode(shiftedCharCode);
      finalString += shiftedChar;
      continue;
    }
    finalString += char;
  }
  return finalString;
}

export default function encryptString({
  input,
  key,
}: {
  input: string;
  key?: string;
}): string {
  const wordshiftOffset = getWordshiftOffset(key);

  let currentString = input;

  for (let round = 0; round < 256; round++) {
    const reorderedString = reorderString(currentString, wordshiftOffset);
    const shiftedString = shiftString(reorderedString, wordshiftOffset);
    currentString = shiftedString;
  }

  return currentString;
}
