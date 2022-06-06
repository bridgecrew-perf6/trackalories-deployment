
const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isNumber = (number: Number): boolean => {
  return typeof number === 'number'
}

export default { isString, isDate, isNumber }
