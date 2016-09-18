##Mood Journal

Integrating Microsoft's Emotion API from the Microsoft Cognitive Services as well as the computer's own video hardware into a Chrome 
Extension that can track how you're feeling throughout the day while you browse via timed snapshots. 

#Getting Started

Download the zip file from GitHub, and open.
Set Chrome extensions to Developer Mode and load in the unpackaged files. 
Right click on <Options>, and agree to the permissions for the use of the Camera.
Browse freely, and express yourself.
Whenever you feel ready, return to <Options> in the extension to review the graphs generated by by your browsing sessions. 

#Data Visualization

The displayed graphs are the main source of information. They display the emotional percentages scored at the time the snapshot was taken. 
Clicking on the data itself will display more information: Score percentage, timestamp, the URL active at that time, and the page title. 
If there is no face detected, that timestamp will not be recorded at all. If the active tab at that time is not in Chrome, the unknown tab 
is reported, and no data is recorded for that timestamp. 







