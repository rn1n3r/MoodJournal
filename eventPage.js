
chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    // do something
});
