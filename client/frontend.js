'use strict';

var frontendData = {
  serverUrl: 'http://localhost:3000/decode',
  headerType: 'content-type',
  headerJson: 'application/json',
  headerCors: 'Access-Control-Allow-Origin',
  headerAll: '*',
  postMethod: 'POST',
  successState: 200,
  buttonAction: 'click',
  timeOut: 2500
}

var domSelectors = {
  resultContainer: document.querySelector('#displayResult'),
  sendButton: document.querySelector('.send'),
  shiftInput: document.querySelector('#setShift'),
  inputText: document.querySelector('#textField'),
  alertBox: document.querySelector('.alert'),
  alertClass: 'hidden'
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
      printDecoded(JSON.parse(xhr.response));
    }
    if (xhr.status === 400) {
      showAlert();
      setTimeout(hideAlert, frontendData.timeOut);
    }
  }
  var data = setRequestObject();
  xhr.send(data && JSON.stringify(data));
}

function printDecoded (response) {
  var printBlock = domSelectors.resultContainer;
  printBlock.textContent = response.text;
}

function showAlert () {
  domSelectors.alertBox.classList.remove(domSelectors.alertClass);
}

function hideAlert () {
  domSelectors.alertBox.classList.add(domSelectors.alertClass);
}

function setListener () {
  domSelectors.sendButton.addEventListener(frontendData.buttonAction, sendDecodeRequest);
}

window.onload = setListener;
