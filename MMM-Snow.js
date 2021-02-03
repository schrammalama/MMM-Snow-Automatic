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

Module.register("MMM-Snow",{

	defaults: {
		flakeCount: 100,
		theme: "winter"                 // pick from themes map below, i.e. winter, love
	},

	themes: {
		"winter" : { 
			"flakePrefix"  : flake,    // prefix of css name, e.g. snow1 
			"imagesCount"  : 3,         // number of images available in this theme, here:  snow1, snow2, snow3
			"downwards"    : true,      // direction of flake movements, snow goes downwards
	},

	getStyles: function() {
		return [ "MMM-Snow.css" ]
	},

	getDom: function() {
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
	var myVar = setInterval(myFunction, 1000000);
 	function myFunction() {
    	location.reload();
	}

});

	fetch('https://api.openweathermap.org/data/2.5/weather?id="your city id"&appid="your api key"')
 .then(function(resp) { return resp.json() }) // Convert data to json
 .then(function(data) {
   drawWeather(data);
 })
 .catch(function() {
   // catch any errors
 });
function drawWeather( d ) {
   if (d.weather[0].description == "light snow") {
       var flake = snow;
   } else if (d.weather[0].description == "moderate snow") {
	   var flake = snow;
   } else if (d.weather[0].description == "heavy snow") {
	   var flake = snow;
   } else if (d.weather[0].description == "light rain") {
	   var flake = rain;
   } else if (d.weather[0].description == "moderate rain") {
	   var flake = rain;
   } else if (d.weather[0].description == "heavy rain") {
	   var flake = rain;
   } else {
       var flake = none;
   }
}

