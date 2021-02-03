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
       var wnd = window.open("http://"remote ip":8080/api/module/MMM-Snow/show");
       setTimeout(function() {
           wnd.close();
       }, 5000);
   } else {
       var wnd = window.open("http://"remote ip":8080/api/module/MMM-Snow/hide");
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

