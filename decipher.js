'use strict';

var decipher = (function() {

  function decipherMessage(message, shift) {
    if (typeof message !== 'string') {
      return message;
    }
    var decoded = '';
    for (var i = 0; i < message.length; i++) {
      var letter = message[i];
      if (letter.match(/[a-zA-Z]/i)) {
        var letterCode = message.charCodeAt(i);
        if ((letterCode >= 65) && (letterCode <= 90)) {
          letter = String.fromCharCode((letterCode - 65 - shift + 26) % 26 + 65);
        }
        else if ((letterCode >= 97) && (letterCode <= 122)) {
          letter = String.fromCharCode((letterCode - 97 - shift + 26) % 26 + 97);
        }
      }
      decoded += letter;
    }
    return decoded;
  }
  return {
    decipherMessage: decipherMessage
  };
}) ();

module.exports = decipher;
