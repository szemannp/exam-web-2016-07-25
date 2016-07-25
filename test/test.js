var decipher = require('../decipher');

var assert = require('chai').assert;

describe('Decipher tests', function() {
  it('should return correct decode', function() {
    var shift = 3;
    var text = "oruhp lsvxp groru vlw";
    assert.equal(decipher.decipherMessage(text, shift), "lorem ipsum dolor sit");
  });

  it('should work with negative shift values', function() {
    var shift = -7;
    var text = "ehkxf bilnf whehk lbm";
    assert.equal(decipher.decipherMessage(text, shift), "lorem ipsum dolor sit");
  });

  it('should return the same as the input text was', function() {
    var shift = 0;
    var text = "oruhp lsvxp groru vlw";
    assert.equal(decipher.decipherMessage(text, shift), text);
  });

  it('should return the input numbers', function() {
    var shift = 7;
    var text = "123 443 655";
    assert.equal(decipher.decipherMessage(text, shift), text);
  });

  it('should work with uppercase texts', function() {
    var shift = 7;
    var text = "SVYLT PWZBT KVSVY ZPA";
    assert.equal(decipher.decipherMessage(text, shift), "LOREM IPSUM DOLOR SIT");
  });


});
