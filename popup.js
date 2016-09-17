document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('onButton');
  chrome.storage.sync.get("key", function (obj) {
    console.log(obj.key);
    button.innerHTML = obj.key ? "Turn OFF Mood Tracking." : "Turn ON Mood Tracking."
  });

  button.addEventListener('click', function() {

    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {

      button.innerHTML = response.farewell;
      console.log(response.farewell);
    });
  }, false);
}, false);
