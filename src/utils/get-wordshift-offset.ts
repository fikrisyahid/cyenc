import getASCII from "./get-ascii";

export default function getWordshiftOffset(key: string | undefined): number {
  let shiftOffset = 0;
  if (key) {
    for (let i = 0; i < key.length; i++) {
      shiftOffset += getASCII(key[i]);
    }
    shiftOffset = (shiftOffset % 26) + 1;
  }

  return shiftOffset;
}
