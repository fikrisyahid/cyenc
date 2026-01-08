export default function getASCII(char: string): number {
  return char.codePointAt(0) || 0;
}