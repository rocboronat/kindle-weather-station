# Kindle weather station
A weather station for your Kindle

<img src="art/kindle-weather-station.jpg"/>

## How to install it?

Well, as the Kindle e-Readers don't support native apps or things like that, the only thing we can do is to open a web with the Experimental Browser and to the best we can with it. So the project is just a web page that you have to edit with your own values, publish it somewhere and access it with the Kindle's browser.

Here's a list with the steps to achieve it:

1. Sign up to [OpenWeather](https://openweathermap.org) and get your own API token
2. Clone the project
3. Open `functions.js`
4. Replace `yourLat`, `yourLon` and `yourToken` with your actual latitude, longitude and API token
5. Set your timezone offset in the `timezoneOffset` (the existing `1` represents for `GMT+1`)
6. Upload the `.html`, `.css` and `.js` files to your favorite web server
7. Type in `~ds` in your Kindle's search box to disable the screensaver
8. Open the Kindle's Experimental Browser and access `index.html`
9. Enjoy!
10. Extra, extra! Take a picture and send it to [@rocboronat](http://twitter.com/rocboronat)! 😍
