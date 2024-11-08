export function numberWithSpaces(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function convertToPercent(decimal: number) {
  const percent = decimal * 100;
  const percentStr = percent.toString();
  const dotIndex = percentStr.indexOf(".");
  if (dotIndex !== -1) {
    const subStr = percentStr.slice(dotIndex, dotIndex + 3);
    if (Number(subStr) === 0) {
      return percentStr.slice(0, dotIndex);
    }
    return percent.toString().slice(0, dotIndex + 3);
  }
  if (isNaN(percent) || percent === Infinity) {
    return 0;
  }
  return percent;
}
