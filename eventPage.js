
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



chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

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
          canvas.getContext("2d").drawImage(video, 0 , 0, 320, 240);
          img = canvas.toDataURL("image/png");
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
              processData: false,

            })
            .done(function(data) {
              console.log(data)
            })
            .fail(function() {
              console.log("error");
            });

        })

      }
      $("video").one("loadeddata", videoListener)
      //video.addEventListener('loadeddata', videoListener, false);







      }, errorCallback);
    });
