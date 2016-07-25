'use strict';

var frontendData = {
  serverUrl: 'http://localhost:3000/decode',
  headerType: 'content-type',
  headerJson: 'application/json',
  headerCors: 'Access-Control-Allow-Origin',
  headerAll: '*',
  postMethod: 'POST',
  successState: 200,
  buttonAction: 'click'
}

var domSelectors = {
  resultContainer: document.querySelector('#displayResult'),
  sendButton: document.querySelector('.send'),
  shiftInput: document.querySelector('#setShift'),
  inputText: document.querySelector('#textField')
};

function setRequestObject() {
  return {
    "shift" : domSelectors.shiftInput.value,
    "text" : domSelectors.inputText.value
  }
}

function sendDecodeRequest () {
  var xhr = new XMLHttpRequest();
  xhr.open(frontendData.postMethod, frontendData.serverUrl, true);
  xhr.setRequestHeader(frontendData.headerType, frontendData.headerJson);
  xhr.setRequestHeader(frontendData.headerCors, frontendData.headerAll);
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === frontendData.successState) {
      printDecoded(xhr.response);
    }
  }
  var data = setRequestObject();
  xhr.send(data && JSON.stringify(data));
}

function printDecoded (response) {
  var printBlock = domSelectors.resultContainer;
  printBlock.textContent = response;
}

function setListener () {
  domSelectors.sendButton.addEventListener(frontendData.buttonAction, sendDecodeRequest);
}

window.onload = setListener;
