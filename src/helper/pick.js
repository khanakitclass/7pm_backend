
const pick = (Object, keys) => {
  return keys.reduce((obj, v, i) => {
    if (Object && Object.hasOwnProperty(v)) {
      obj[v] = Object[v];

      return obj;
    }
  }, {})
}

module.exports = pick;