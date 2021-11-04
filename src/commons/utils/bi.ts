const numFormatReg = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
const validNumReg = /^[-｜0-9]+[0-9./]*$/;
function validAndFormat(numStr: string) {
  return validNumReg.test(numStr) ? numStr.replace(numFormatReg, ',') : numStr;
}
export function formatNum(num: number | undefined) {
  return num ? validAndFormat(num.toString()) : 0;
}