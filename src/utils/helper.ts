function _reorderStringIndexWrap(
  frontIndex: number,
  backIndex: number,
  inputLength: number // Ubah parameter string jadi length aja biar efisien
) {
  let fIdx = frontIndex;
  let bIdx = backIndex;

  if (fIdx >= inputLength) {
    fIdx = 0;
  }
  if (bIdx < 0) {
    bIdx = inputLength - 1;
  }

  return {
    fIdx,
    bIdx,
  };
}

export { _reorderStringIndexWrap };
