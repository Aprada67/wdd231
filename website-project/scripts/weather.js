import { loadJSON } from "./utils.mjs";

// Current Weather Const
const weatherIcon = document.querySelector("#weather-icon");
const currentTemp = document.querySelector("#current-temp");
const currentWeather = document.querySelector("#current-weather");
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity");
const advice = document.querySelector("#advice");

// Button
const getWeatherInfo = document.getElementById("get-location-btn");

// Verify if the browser supports the geolocation
getWeatherInfo.addEventListener("click", function () {
    // Add class to show weather icon
    weatherIcon.classList.remove("hide-icon");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get lat and lon
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // API key
            var apiKey = "a2ba733d95cb2cf0fdc13341da735987";

            // API url
            var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            async function loadWatherData() {
                try {
                    const data = await loadJSON(url);
                    displayWeatherData(data);
                    console.log(data);
                } catch (error) {
                    console.error("Error loading weather data:", error);
                }
            }

            loadWatherData();

        });
    } else {
        console.log("Geolocation not supported for this browser");
    }
});

function displayWeatherData(data) {
    // Weather Icon
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    // Insert icon src and alt
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);

    // Weather info
    currentTemp.innerHTML = `<strong>${Math.round(data.main.temp)}&deg;</strong> F`;
    currentWeather.textContent = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
    highTemp.innerHTML = `${Math.round(data.main.temp_max)}&deg;`;
    lowTemp.innerHTML = `${Math.round(data.main.temp_min)}&deg;`;
    humidity.textContent = data.main.humidity;

    // Check if the weather is good
    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("clear") || weatherMain.includes("clouds")) {
        advice.textContent = "Today is a good day to train outside!";
    } else {
        advice.textContent = "Today is a good day to train at home!";
    }
}