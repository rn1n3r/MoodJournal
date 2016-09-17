var y1 = []
var y2 = []
var y3 = []
var u = []

chrome.storage.sync.get(null, function(items) {
		var allKeys = Object.keys(items);
		console.log(allKeys);


		//append keys array used for x axis
		var xaxis = allKeys;

		// removes "key" key
		xaxis.splice(-1,1)

		//everything up to here works
		//use keys to pull values and put into 3 different arrays for the traces


		// console.log(xaxis[2])


		// curKey = xaxis[2]

		// This thing works:
		// chrome.storage.sync.get(curKey, function(obj) {
		// 		console.log(obj[curKey].h)
		// 	});
		
		var y1 = [];
		var y2 = [];
		var y3 = [];
		var u = [];

		$.each(xaxis, function (index, value) {
			chrome.storage.sync.get(value, function(obj) {
				y1.push(obj[value].h);
				y2.push(obj[value].s);
				y3.push(obj[value].n);
				u.push(obj[value].u);
				

			});

		});
		console.log(y1);

		console.log(y2);

		console.log(y3);

		console.log(u);


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
