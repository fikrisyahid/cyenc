import getASCII from "./get-ascii";
import getWordshiftOffset from "./get-wordshift-offset";
import { _reorderStringIndexWrap } from "./helper";
import { isLetter, isLowerCaseLetter } from "./is-letter";

function unreorderString(input: string, wordshiftOffset: number): string {
  const resultArray = new Array(input.length);

  let frontIndex = wordshiftOffset % input.length;
  let backIndex = frontIndex - 1;
  let isFrontTurn = true;
  let frontMeetBack = false;
  let inputIterator = 0;

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
      resultArray[frontIndex] = input[inputIterator];
      frontIndex++;
      inputIterator++;
    } else {
      // Ambil huruf ke-i dari input, taruh di posisi 'backIndex'
      resultArray[backIndex] = input[inputIterator];
      backIndex--;
      inputIterator++;
    }

    isFrontTurn = !isFrontTurn;

    if (frontMeetBack) {
      break;
    }
  }

  return resultArray.join("");
}

function unshiftString(input: string, wordshiftOffset: number): string {
  let finalString = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const asciiChar = getASCII(char);

    if (isLetter(char)) {
      const base = isLowerCaseLetter(char) ? getASCII("a") : getASCII("A");
      const alphabetIndex = asciiChar - base - wordshiftOffset - i - 1;
      const unshiftedCharCode = (((alphabetIndex % 26) + 26) % 26) + base;
      const unshiftedChar = String.fromCharCode(unshiftedCharCode);
      finalString += unshiftedChar;
      continue;
    }
    finalString += char;
  }
  return finalString;
}

export default function decryptString({
  input,
  key,
}: {
  input: string;
  key?: string;
}): string {
  const wordshiftOffset = getWordshiftOffset(key);

  let currentString = input;

  for (let round = 0; round < 256; round++) {
    const unshiftedString = unshiftString(currentString, wordshiftOffset);
    const unreorderedString = unreorderString(unshiftedString, wordshiftOffset);
    currentString = unreorderedString;
  }

  return currentString;
}
