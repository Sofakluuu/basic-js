const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }

  getCharIndex(char) {
    return char.toUpperCase().charCodeAt(0) - 65;
  }

  getCharFromIndex(index) {
    return String.fromCharCode(index + 65);
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Invalid arguments!');

    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      let messageChar = message[i];
      let keyChar = key[keyIndex % key.length];

      if (/[A-Za-z]/.test(messageChar)) {
        let messageIndex = this.getCharIndex(messageChar);
        let keyIndexValue = this.getCharIndex(keyChar);

        let encryptedChar = this.getCharFromIndex((messageIndex + keyIndexValue) % 26);
        encryptedMessage += encryptedChar;

        keyIndex++;
      } else {
        encryptedMessage += messageChar;
      }
    }

    if (!this.direct) {
      encryptedMessage = encryptedMessage.split('').reverse().join('');
    }

    return encryptedMessage;
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error('Invalid arguments!');

    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      let messageChar = message[i];
      let keyChar = key[keyIndex % key.length];

      if (/[A-Za-z]/.test(messageChar)) {
        let messageIndex = this.getCharIndex(messageChar);
        let keyIndexValue = this.getCharIndex(keyChar);

        let decryptedChar = this.getCharFromIndex((messageIndex - keyIndexValue + 26) % 26);
        decryptedMessage += decryptedChar;

        keyIndex++;
      } else {
        decryptedMessage += messageChar;
      }
    }

    if (!this.direct) {
      decryptedMessage = decryptedMessage.split('').reverse().join('');
    }

    return decryptedMessage;
  }
}


module.exports = {
  VigenereCipheringMachine
};
