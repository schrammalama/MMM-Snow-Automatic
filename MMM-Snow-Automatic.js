/* Magic Mirror
 * Module: MMM-Snow
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 * 
 * Comment on terminology: a 'flake' is any moving item being shown on the mirror, while
 * the specific themed items are called 'snow' or 'heart'. This applies to variable names
 * file names and css class names.
 */
var type;
var weather;

	fetch('https://api.openweathermap.org/data/2.5/weather?id=5746545&appid=43a6677e78ccfd66a61091586d78a3c0')
	 .then(function(resp) { return resp.json() }) // Convert data to json
	 .then(function(data) {
	   drawWeather(data);
	 })
	 .catch(function() {
	   // catch any errors
	 });
function drawWeather( d ) {
	weather = d.weather[0].description;
				
	   if (weather == "overcast clouds") {
		    type = "snow";
	   } else if (weather == "broken snow") {
		   type = "rain";
	   } else if (weather == "heavy snow") {
		   type = "snow";
	   } else if (weather == "light rain") {
		   type = "rain";
	   } else if (weather == "moderate rain") {
		   type = "rain";
	   } else if (weather == "heavy rain") {
		   type = "rain";
	   } else {
		   type = "none";
	   }
};
		const myFunction = async() => {
		const weather = await drawWeather()
	return weather
};
Module.register("MMM-Snow-Automatic",{

	defaults: {
		flakeCount: 100,
		theme: "winter"                 // pick from themes map below, i.e. winter, love
	},


	themes: {
		"winter" : { 
			"flakePrefix"  : type,    // prefix of css name, e.g. snow1 
			"imagesCount"  : 1,         // number of images available in this theme, here:  snow1, snow2, snow3
			"downwards"    : true,      // direction of flake movements, snow goes downwards
			"sizeFactor"   : 1},        // adapt size of flakes to your liking, use original flake size
	},

	getStyles: function() {
		return [ "MMM-Snow-Automatic.css" ]
	},
	getDom: function() {
		myFunction()
		var themeSettings = this.themes[this.config.theme];
		var wrapper = document.createElement("div")
		wrapper.className = "wrapper"

		var flake, jiggle, size;

		for(var i = 0; i < this.config.flakeCount; i++) {

			size = themeSettings.sizeFactor * (Math.random() * 0.75) + 0.25;
			flakeImage = document.createElement("div")

			var flakeSuffix = Math.round(1 + Math.random() * (themeSettings.imagesCount - 1));
			flakeImage.className = themeSettings.flakePrefix + flakeSuffix;			
			flakeImage.style.transform = "scale(" + size +", " + size + ")";
			flakeImage.style.opacity = size;
			flake = document.createElement("div");
			if(themeSettings.downwards) {
				flake.className = "flake-downwards";
			}
			else {
				flake.className = "flake-upwards"
			}

			jiggle = document.createElement("div");
			jiggle.style.animationDelay = (Math.random() * 4) + "s";
			jiggle.style.animationDuration = ((Math.random() * 30) + 30) + "s";
			jiggle.appendChild(flakeImage);

			size = (Math.random() * 0.75) + 0.25;
			jiggle.style.transform = "scale(" + size +", " + size + ")";
			jiggle.style.opacity = size;

			flake.appendChild(jiggle);
			flake.style.left = ((Math.random() * 100) - 10) + "%";
			flake.style.animationDelay = (Math.random() * 100) + "s";
			flake.style.animationDuration = 100 - (Math.random() * 50 * size) + "s";
			wrapper.appendChild(flake);

		}
		return wrapper;
	}

});


