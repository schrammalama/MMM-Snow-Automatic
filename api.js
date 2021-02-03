
      // This is where it calls the weather api for data
    function weatherBalloon( cityID ) {
  var key = '43a6677e78ccfd66a61091586d78a3c0';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
  })
  .catch(function() {
    // catch any errors
  });
}

window.onload = function() {
  weatherBalloon( 5746545 );
}
  // Take data from json and set the values of 'description', 'temp', etc
function drawWeather( d ) {
    description = document.createElement("div")
    description.className = 'description'
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
    
    document.getElementById('description') = d.weather[0].description;
    //This is where it takes the description straight from the json instead of previously where it took it from the html value
    if (d.weather[0].description == "light snow") {
        var wnd = window.open("http://192.168.7.247:8080/api/module/MMM-Snow/show");
        setTimeout(function() {
            wnd.close();
        }, 5000);
    } else {
        var wnd = window.open("http://192.168.7.247:8080/api/module/MMM-Snow/hide");
        setTimeout(function() {
        wnd.close();
        }, 5000);
    }
}
// This is it reloading every ten minutes
var myVar = setInterval(myFunction, 1000000);
 function myFunction() {
    location.reload();
}
