var y1 = []
var y2 = []
var y3 = []
var u = []

chrome.storage.sync.get(null, function(items) {
		var allKeys = Object.keys(items);
		console.log(allKeys);


		//append keys array used for x axis
		var xaxis = allKeys;


		//everything up to here works
		//use keys to pull values and put into 3 different arrays for the traces


		// console.log(xaxis[2])


		// curKey = xaxis[2]

		// This thing works:
		// chrome.storage.sync.get(curKey, function(obj) {
		// 		console.log(obj[curKey].h)
		// 	});
		


		for (var i = 0; i < xaxis.length; i++) {

			if (xaxis[i] != 'key') {
				curKey = xaxis[i]

				console.log(xaxis[i])

				chrome.storage.sync.get(curKey, function(obj) {
					ans1 = obj[curKey].h
					y1.push.apply(ans1)
					console.log(ans1)
					console.log(y1)
				});
				chrome.storage.sync.get(curKey, function(obj) {
					ans2 = obj[curKey].s 
				    y2.push.apply(ans2)
				    console.log(ans2)
				    console.log(y2)
				});
				chrome.storage.sync.get(curKey, function(obj) {
					ans3 = obj[curKey].n
					y3.push.apply(ans3)
					console.log(ans3)
					console.log(y3)
				});
				chrome.storage.sync.get(curKey, function(obj) {
					ans4 = obj[curKey].u
					u.push.apply(ans4)
					console.log(ans4)
					console.log(y4)
				});
			}

			
		};

		//henry's code 



		var happyTrace = {
			x: xaxis,
			y: y1,
			name: "Happiness",
			type: 'bar'
		};

		var sadTrace = {
			x: xaxis,
			y: y2,
			name: "Sadness",
			type: 'bar'
		};

		var neutralTrace = {
			x: xaxis,
			y: y3,
			name: "Neutral",
			type: 'bar'
		};

		var data = [happyTrace, sadTrace, neutralTrace];

		var layout = {barmode: 'stack',
		              xaxis: {autorange: 'reversed'}};

		TESTER = document.getElementById('tester');
		Plotly.newPlot(TESTER, data, layout);

		//this part works now. Get for loop working

});
