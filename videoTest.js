
var errorCallback = function(e) {
  console.log('Error', e);
};

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

//HENRY'S & XY'S FUNCTIONS

function setHappyLevel(timestamp, happy,sad,neutral, url) {
    var key = timestamp,
        level = JSON.stringify({
            'h': happy,
            's' : sad,
            'n' : neutral,
            'u' : url
        });
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

function getActiveTab() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        return tabs[0].url;
    });
}

//----Henry Code End



navigator.getUserMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);
  navigator.getUserMedia({video: true},
    function(localMediaStream) {
      var video = document.querySelector('video');

      var canvas = document.getElementById('c');

      video.src = window.URL.createObjectURL(localMediaStream);
      var button = document.getElementById('checkPage');
      button.addEventListener('click', function() {
        canvas.getContext("2d").drawImage(video, 0 , 0, 320, 240);
        var img = canvas.toDataURL("image/png");
        $(function() {
            var params = {
                // Request parameters
            };

            $.ajax({
                url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" + $.param(params),
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","99eeef9307374b0082230b1013314f94");

                },
                type: "POST",
                // Request body
                data: makeblob(img),
                processData: false
            })
            .done(function(data) {

              //NEW
                response = data
                happy = response[0].scores.happiness
                sad = response[0].scores.sadness
                neutral = response[0].scores.neutral
                timestamp = timeStamp()
                url = getActiveTab()

                setHappyLevel(timestamp, happy,sad,neutral)
                getHappyLevel(timestamp)

                //NEW END
            })
            .fail(function() {
                console.log("error");
            });
        });
      });


    }, errorCallback);
