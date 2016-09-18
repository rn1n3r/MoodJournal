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
				y1.push(Math.round((obj[value].h * 100)*100)/100);
				y2.push(Math.round((obj[value].s * 100)*100)/100);
				y3.push(Math.round((obj[value].n * 100)*100)/100);
				u.push(obj[value].u);
				

			});

		});

		var text = []
		$.each(xaxis, function(index, value) {
			text.push(value.substring(0,2) + "/" + value.substring(2,4) + " " + value.substring(8,10) + ":" + value.substring(10,12))

		})
		
		// console.log(y1);

		// console.log(y2);

		// console.log(y3);

		// console.log(u);


		//henry's code 

		N = xaxis.length
		var x = Array.from(Array(N).keys())
		x.map(String)




		var happyTrace = {
			x: x,
			y: y1,
			name: "Happiness",
			mode: 'line',
			type: 'scatter',
			text: text 
		};

		var sadTrace = {
			x: x,
			y: y2,
			name: "Sadness",
			mode: 'line',
			type: 'scatter',
			text: text
		};

		var neutralTrace = {
			x: x,
			y: y3,
			name: "Neutral",
			mode: 'markers',
			type: 'scatter',
			text: text
		};

		var data = [happyTrace, sadTrace, neutralTrace];

		var layout = {
			
			title: 'Mood Journal —',
			xaxis: {
				title: 'Time Points',
				autorange: true
			},
			yaxis: {

				title: '% Mood',
				autorange: true
			}

		};

		TESTER = document.getElementById('tester');
		Plotly.plot(TESTER, data, layout);


		//this part works now. Get for loop working

		//Trying to auto click the autoscale button lel

		// $(document).ready(function(){
		// 	$('[data-title="Autoscale"]').trigger('click');

		// })

});


