var urlParams = new URLSearchParams(window.location.search);

var lat = urlParams.get('lat')
var lon = urlParams.get('lon')
var token = urlParams.get('token')
var timezone = urlParams.get('timezone')

var timezoneOffset = timezone * 60 * 60 * 1000

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={token}';
var url = ""

function onPageLoad() {
  url = baseUrl
    .replace("{lat}", lat)
    .replace("{lon}", lon)
    .replace("{token}", token)

  setInterval(function() {
    updateScreen();
  }, 60000);
  updateScreen();
}

function updateScreen() {
  try {
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
  } catch (e) {
    console.error(e);
    document.getElementById("temperatureContent").innerHTML = "Error";
  }
}
