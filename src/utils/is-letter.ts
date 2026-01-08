function isLetter(char: string): boolean {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

function isLowerCaseLetter(char: string): boolean {
  return char >= "a" && char <= "z";
}

function isUpperCaseLetter(char: string): boolean {
  return char >= "A" && char <= "Z";
}

export { isLetter, isLowerCaseLetter, isUpperCaseLetter };
