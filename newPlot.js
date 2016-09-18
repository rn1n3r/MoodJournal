chrome.storage.local.get(null, function(items) {
	var xaxis = Object.keys(items);
	console.log(xaxis);
	//append keys array used for x axis


	// removes "key" key
	xaxis.splice(-1,1)

	var y1 = [];
	var y2 = [];
	var y3 = [];
	var y4 = [];
	var y5 = [];
	var y6 = [];
	var y7 = [];
	var y8 = [];
	var u = [];
	var pageTitle = [];
	var text = [];
	var thumbNail = [];
	$.each(xaxis, function (index, value) {
		chrome.storage.local.get(value, function(obj) {
			y1.push(Math.round((obj[value].happy * 100)*100)/100);
			y2.push(Math.round((obj[value].sad * 100)*100)/100);
			y3.push(Math.round((obj[value].neutral * 100)*100)/100);
			y4.push(Math.round((obj[value].anger * 100)*100)/100);
			y5.push(Math.round((obj[value].contempt * 100)*100)/100);
			y6.push(Math.round((obj[value].disgust * 100)*100)/100);
			y7.push(Math.round((obj[value].surprise * 100)*100)/100);
			y8.push(Math.round((obj[value].fear * 100)*100)/100);
			u.push(obj[value].url);
			pageTitle.push(obj[value].title);
			thumbNail.push(obj[value].img);

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
		name: "Sad",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var sadTrace = {
		x: x,
		y: y2,
		name: "Happiness",
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

	// Graph 1

	var data1 = [happyTrace, sadTrace, neutralTrace];

	// graphTitle1 = 'Mood Journal ' + text[0] + ' - ' + text[text.length - 1]

graphTitle1 = 'Happiness/Sadness'
	var layout1 = {

		title: graphTitle1,
		xaxis: {
			title: 'Time Points',
			autorange: true
		},
		yaxis: {

			title: '% Mood',
			autorange: true
		}

	};

	graph1 = document.getElementById('graph');
	Plotly.plot(graph1, data1, layout1).then(function() {
		window.requestAnimationFrame(function() {
			window.requestAnimationFrame(function() {

				Plotly.redraw(graph1);
			});
		});
	});

	graph1.on('plotly_click', function(data){
		console.log(pageTitle[data.points[0].x]);
		infoBox = document.getElementById("site");
		infoBox.innerHTML = "<b>Site: </b><a href=" + u[data.points[0].x] + ">" + pageTitle[data.points[0].x] + "</a>";

		infoBox = document.getElementById("scores");
		infoBox.innerHTML = "<p style=\"color:#8F5834; font-size: 14; \">" + "Sad %: " + y1[data.points[0].x] + "</p>";
		infoBox.innerHTML += "<p style=\"color:#8F5834; font-size: 14; \">" + "Happy %: " + y2[data.points[0].x] + "</p>";
		infoBox.innerHTML += "<p style=\"color:#8F5834; font-size: 14; \">" + "Neutral %: " + y3[data.points[0].x] + "</p>";




		var canvas = document.getElementById('c');

		var img = new Image;

		img.onload = function(){
		  canvas.getContext("2d").drawImage(img,0,0); // Or at whatever offset you like
		};
		img.src = thumbNail[data.points[0].x];
	});

	// Graph 2

	var angerTrace = {
		x: x,
		y: y4,
		name: "Anger",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var contemptTrace = {
		x: x,
		y: y5,
		name: "Contempt",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var disgustTrace = {
		x: x,
		y: y6,
		name: "Disgust",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var surpriseTrace = {
		x: x,
		y: y7,
		name: "Surprise",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var fearTrace = {
		x: x,
		y: y8,
		name: "Fear",
		mode: 'line',
		type: 'scatter',
		text: text
	};

	var data2 = [angerTrace, contemptTrace, disgustTrace, surpriseTrace, fearTrace];

	// graphTitle2 = 'Bonus Emotions ' + text[0] + ' - ' + text[text.length - 1]

	graphTitle2 = 'Other Emotions'
	var layout2 = {

		title: graphTitle2,
		xaxis: {
			title: 'Time Points',
			autorange: true
		},
		yaxis: {

			title: '% Mood',
			autorange: true
		}

	};

	graph2 = document.getElementById('extraEmotes');
	Plotly.plot(graph2, data2, layout2).then(function() {
		window.requestAnimationFrame(function() {
			window.requestAnimationFrame(function() {

				Plotly.redraw(graph2);
			});
		});
	});

	graph2.on('plotly_click', function(data){
		console.log(pageTitle[data.points[0].x]);
		infoBox = document.getElementById("site");
		infoBox.innerHTML += "<a href=" + u[data.points[0].x] + ">" + pageTitle[data.points[0].x] + "</a>";
		var canvas = document.getElementById('c');

		var img = new Image;

		img.onload = function(){
		  canvas.getContext("2d").drawImage(img,0,0); // Or at whatever offset you like
		};
		img.src = thumbNail[data.points[0].x];
	});



});
