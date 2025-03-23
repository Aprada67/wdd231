// Current Weather Const
const weatherIcon = document.querySelector("#weather-icon");
const currentTemp = document.querySelector("#current-temp");
const currentWeather = document.querySelector("#current-weather");
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");

// Weather Forecats Const
const todayWeather = document.querySelector("#today");
const tomorrowWeather = document.querySelector("#tomorrow");
const afterTomorrowWeather = document.querySelector("#after-tomorrow");

// Api Url Const using Forecast
const urlForecast = "https://api.openweathermap.org/data/2.5/forecast?lat=10.16&lon=-68.00&units=imperial&appid=3851f9301209bdb68f44e33249150239";

let todayDate = new Date();
let tomorrowDate = new Date(todayDate.getTime() + 24*60*60*1000);
let dayAfterTomorrowDate = new Date(todayDate.getTime() + 48*60*60*1000);

async function apiFetch() {
    try {
        const response = await fetch(urlForecast);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayCurrentWeather(data);
            displayWeatherForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    // Weather Icon
    const iconsrc = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    let desc = data.list[0].weather[0].description;

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);

    // Weather info
    currentTemp.innerHTML = `<strong>${Math.round(data.list[0].main.temp)}&deg;</strong> F`;
    currentWeather.textContent = data.list[0].weather[0].description[0].toUpperCase() + data.list[0].weather[0].description.slice(1);
    highTemp.innerHTML = `${Math.round(data.list[0].main.temp_max)}&deg;`;
    lowTemp.innerHTML = `${Math.round(data.list[0].main.temp_min)}&deg;`;
    humidity.textContent = data.list[0].main.humidity;
    sunrise.textContent = new Date(data.city.sunrise * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    sunset.textContent = new Date(data.city.sunset * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

// Get Day Name
function getDayName(date) {
    const options = { weekday: 'long' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Display the weather forecast for the next days
function displayWeatherForecast(data) {
    todayWeather.innerHTML = `Today: <strong>${Math.round(data.list[0].main.temp)}&deg;</strong> F`;
    tomorrowWeather.innerHTML = `${getDayName(tomorrowDate)}: <strong>${Math.round(data.list[8].main.temp)}&deg;</strong> F`;
    afterTomorrowWeather.innerHTML = `${getDayName(dayAfterTomorrowDate)}: <strong>${Math.round(data.list[16].main.temp)}&deg;</strong> F`;
}

apiFetch();

// -----------------------------
// ----- Company Spotlight -----
// -----------------------------

const url = "data/members.json";
const cards = document.querySelector("#company-spotlight-container");

async function getCompaniesData() {
    const response = await fetch(url);
    const data = await response.json();
    showCompanies(data.companies);
}

getCompaniesData(url);

function showCompanies(companies) {
    companies.slice(0, 3).forEach(company => {
        const companyDiv = document.createElement("div");
        companyDiv.classList.add("company-spotlight");

        companyDiv.innerHTML = `
            <h4>${company.name}</h4>
            <p><strong>Member Level:</strong> ${"&#9733;".repeat(company.memberLevel)}</p>
            <p><strong>Location:</strong> ${company.address}</p>
            <p><strong>Website:</strong> <a href="${company.url}" target="_blank">${company.url}</a></p>
            <p><strong>Phone:</strong> ${company.phoneNumber}</p>
            <img src="${company.image}" alt="${company.name} logo" width="100">
        `;

        cards.appendChild(companyDiv);
    });
}