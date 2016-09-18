chrome.storage.sync.get(null, function(items) {
	var xaxis = Object.keys(items);
	console.log(xaxis);
	//append keys array used for x axis


	// removes "key" key
	xaxis.splice(-1,1)

	var y1 = [];
	var y2 = [];
	var y3 = [];
	var u = [];
	var text = [];

	$.each(xaxis, function (index, value) {
		chrome.storage.sync.get(value, function(obj) {
			y1.push(Math.round((obj[value].h * 100)*100)/100);
			y2.push(Math.round((obj[value].s * 100)*100)/100);
			y3.push(Math.round((obj[value].n * 100)*100)/100);
			u.push(obj[value].u);

		});

	});


	$.each(xaxis, function(index, value) {
		text.push(value.substring(0,2) + "/" + value.substring(2,4) + " " + value.substring(8,10) + ":" + value.substring(10,12))

	})


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

	graphTitle = 'Mood Journal ' + text[0] + ' - ' + text[text.length - 1]

	var layout = {

		title: graphTitle,
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
	Plotly.plot(TESTER, data, layout).then(function() {
		window.requestAnimationFrame(function() {
			window.requestAnimationFrame(function() {

				Plotly.redraw(TESTER);
			});
		});
	});
});
