
var errorCallback = function(e) {
  console.log('Error', e);
};


//HENRY'S & XY'S FUNCTIONS

function setHappyLevel(timestamp, happy,sad,neutral, url) {
  var key = timestamp,
  level = {
    'h': happy,
    's' : sad,
    'n' : neutral,
    'u' : url
  };
  var jsonfile = {};
  jsonfile[key] = level;
  chrome.storage.sync.set(jsonfile, function () {
    console.log('Saved', key, level);
  });

}

function getHappyLevel(timestamp) {
  chrome.storage.sync.get(timestamp, function (obj) {
    console.log(timestamp, obj);
  });
}

// this is good format for mood journal output --> is now a string
function timeStamp() {
  var now = new Date();
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  var time = [ now.getHours(), now.getMinutes()];

  // Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

  // If hour is 0, set it to 12
  time[0] = time[0] || 12;

  for ( var i = 0; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
      if ( date[i] < 10) {
        date[i] = "0" + date[i];
      }
    }
  }
  return date.join("") + time.join("");
}


//----Henry Code End


// Magic function to convert image to compatible format for Emotion API
makeblob = function (dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

chrome.runtime.onInstalled.addListener(function(details){
  var onState = {};
  onState["key"] = true;
  chrome.storage.sync.set(onState, function () {
    console.log('Saved');
  });
});

// Alarm to trigger event every minute (for now)
chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

// Listen for a stop message from the popup

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.greeting == "hello") {
      chrome.storage.sync.get("key", function (obj) {
        if (obj.key == true) {
          chrome.alarms.clear("1min");
          var video = document.querySelector('video');
          video.src = "";

          var onState = {};
          onState["key"] = false;
          chrome.storage.sync.set(onState, function () {
            console.log('Saved');
          });
          sendResponse({farewell: "Turn ON Mood Tracking!"});
        }
        else {
          chrome.alarms.create("1min", {
            delayInMinutes: 1,
            periodInMinutes: 1
          });
          var onState = {};
          onState["key"] = true;
          chrome.storage.sync.set(onState, function () {
            console.log('Saved');
          });


          sendResponse({farewell: "Turn OFF Mood Tracking!"});
        }




      });
      console.log()


    }

    return true;
  }
);

chrome.alarms.onAlarm.addListener(function(alarm) {
  // do something

  navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
    navigator.getUserMedia({video: true},
      function(localMediaStream) {
        var video = document.querySelector('video');

        var canvas = document.getElementById('c');

        video.src = window.URL.createObjectURL(localMediaStream);
        video.load();

        var button = document.getElementById('checkPage');

        var videoListener = function() {
          setTimeout(function() {
            canvas.getContext("2d").drawImage(video, 0 , 0, 320, 240);
            img = canvas.toDataURL("image/png");
            //your code to be executed after 1 second



          $(function() {
            var params = {
              // Request parameters
            };
            $("body").css("cursor", "default");
            $.ajax({
              url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
              beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","99eeef9307374b0082230b1013314f94");
                $("body").css("cursor", "default");
              },
              type: "POST",
              // Request body
              data: makeblob(img),
              processData: false,

            })
            .done(function(data, statusText, xhr) {
              console.log(data)
              console.log(xhr.status)
              //NEW
              response = data;
              if (response.length != 0) {
                happy = response[0].scores.happiness
                sad = response[0].scores.sadness
                neutral = response[0].scores.neutral
                timestamp = timeStamp()

                // Active tab url query
                // Call setHappyLevel in the callback
                chrome.tabs.query({currentWindow: true, active: true
                },
                function(tabs){
                  if (!tabs[0]) {
                    console.log("Warning: unknown")
                    result = "unknown";
                  }
                  else {
                    result = tabs[0].url;
                  }
                  setHappyLevel(timestamp, happy, sad, neutral, result);
                });
                getHappyLevel(timestamp);

              }
              else {
                console.log("Error: no face detected");
              }
              video.src = "";
              track = localMediaStream.getTracks()[0];
              track.stop();

              //NEW END
            })
            .fail(function() {
              console.log("error");
            });

          })
          }, 200);
        }
        $("video").one("loadeddata", videoListener);

      }, errorCallback);
    });
