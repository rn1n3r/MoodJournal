
var errorCallback = function(e) {
  console.log('Error', e);
};

navigator.getUserMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);

  navigator.getUserMedia({video: true},
    function(localMediaStream) {
      track = localMediaStream.getTracks()[0];
      track.stop();
    }, errorCallback);
