const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (str === '') {
    return "";
  } else {
    let lettersArray = str.match(/(.)\1*/g);
    let result = [];
    for (let i = 0; i < lettersArray.length; i += 1) {
      let countOfLetters = lettersArray[i].length
      if (countOfLetters > 1) {
        result.push(countOfLetters + lettersArray[i][0]);
      } else {
        result.push(lettersArray[i][0]);
      }
    }
    return result.join('');
  }
}

module.exports = {
  encodeLine
};
