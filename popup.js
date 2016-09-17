document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('onButton');
  button.addEventListener('click', function() {

    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {

      button.innerHTML = response.farewell;
      console.log(response.farewell);
    });
  }, false);
}, false);
