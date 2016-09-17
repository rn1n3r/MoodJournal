api = "https://api.projectoxford.ai/emotion/v1.0/recognize";

var xhr = new XMLHttpRequest();
xhr.open("POST", api);

xhr.setRequestHeader(
  "Ocp-Apim-Subscription-Key", "99eeef9307374b0082230b1013314f94"

)

xhr.send({ "url": "http://www.pngall.com/wp-content/uploads/2016/04/Happy-Person-Free-Download-PNG.png" })
