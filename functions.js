var lat = getQueryString('lat')
var lon = getQueryString('lon')
var token = getQueryString('token')
var timezone = getQueryString('timezone')

var timezoneOffset = timezone * 60 * 60 * 1000

const baseWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={token}';
const baseUvUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&units=metric&appid={token}'
var weatherUrl = ""
var uvUrl = ""

function onPageLoad() {
  weatherUrl = baseWeatherUrl
    .replace("{lat}", lat)
    .replace("{lon}", lon)
    .replace("{token}", token)
  uvUrl = baseUvUrl
    .replace("{lat}", lat)
    .replace("{lon}", lon)
    .replace("{token}", token)

  setInterval(function() {
    updateScreen();
  }, 120000);
  updateScreen();
}

function updateScreen() {
  try {
    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open("GET", weatherUrl, false); // false for synchronous request
    weatherRequest.send(null);
    weatherResponse = JSON.parse(weatherRequest.responseText);

    var uvRequest = new XMLHttpRequest();
    uvRequest.open("GET", uvUrl, false); // false for synchronous request
    uvRequest.send(null);
    uvResponse = JSON.parse(uvRequest.responseText);

    temp = weatherResponse.main.temp;
    tempMin = weatherResponse.main.temp_min;
    tempMax = weatherResponse.main.temp_max;
    sunriseDate = new Date(weatherResponse.sys.sunrise * 1000 + timezoneOffset);
    sunsetDate = new Date(weatherResponse.sys.sunset * 1000 + timezoneOffset)
    timeSunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
    timeSunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();
    uvIndex = uvResponse.value;

    document.getElementById("temperatureContent").innerHTML = "" + parseFloat(temp).toFixed(1) + "\xB0";
    document.getElementById("bottomContent").innerHTML =
      "UV Index: " + uvIndex + "<br/>" +
      "Min: " + parseFloat(tempMin).toFixed(1) + "\xB0" + "<br/>" +
      "Max: " + parseFloat(tempMax).toFixed(1) + "\xB0" + "<br/>" +
      "Sunrise: " + timeSunrise + "<br/>" +
      "Sunset: " + timeSunset;
  } catch (e) {
    console.error(e);
    document.getElementById("temperatureContent").innerHTML = "Error";
  }
}

function getQueryString(key) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == key) {
      console.log(key + " = " + pair[1]);
      return pair[1];
    }
  }
}
