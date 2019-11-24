var timezoneOffset = 1 * 60 * 60 * 1000
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=yourLat&lon=yourLon&units=metric&appid=yourToken';

function onPageLoad() {
  setInterval(function() {
    updateScreen();
  }, 60000);
  updateScreen();
}

function updateScreen() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);

  response = JSON.parse(xmlHttp.responseText);

  temp = response.main.temp;
  tempMin = response.main.temp_min;
  tempMax = response.main.temp_max;
  sunriseDate = new Date(response.sys.sunrise * 1000 + timezoneOffset);
  sunsetDate = new Date(response.sys.sunset * 1000 + timezoneOffset)
  timeSunrise = sunriseDate.getHours() + ":" + sunriseDate.getMinutes();
  timeSunset = sunsetDate.getHours() + ":" + sunsetDate.getMinutes();

  document.getElementById("temperatureContent").innerHTML = "" + parseFloat(temp).toFixed(1) + "\xB0";
  document.getElementById("bottomContent").innerHTML =
    "Min: " + parseFloat(tempMin).toFixed(1) + "\xB0" + "<br/>" +
    "Max: " + parseFloat(tempMax).toFixed(1) + "\xB0" + "<br/>" +
    "Sunrise: " + timeSunrise + "<br/>" +
    "Sunset: " + timeSunset;
}
