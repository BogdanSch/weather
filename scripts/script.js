let cityForm;

let infoContainer;
let temperatureLabel;
let temperatureFeelsLikeLabel;
let weatherDescriptionContainer;
let locationContainer;
let weatherIcon;

document.addEventListener("DOMContentLoaded", function () {
  cityForm = document.getElementById("cityForm");
  const cityInput = document.getElementById("city");

  infoContainer = document.querySelector(".weather-card__content");
  temperatureLabel = document.querySelector("#temperature span");
  temperatureFeelsLikeLabel = document.querySelector(
    "#temperatureFeelsLike span"
  );
  weatherDescriptionContainer = document.getElementById("weatherDescription");
  locationContainer = document.getElementById("location");
  weatherIconContainer = document.getElementById("weatherIcon");

  cityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const city = cityInput.value;
    fetchWeatherData(city);
  });
});

function fetchWeatherData(city) {
  const apiKey = "fada024d74ea8c82c596e30e55e3f9d1";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayWeatherData(data) {
  infoContainer.classList.remove("hidden");
  const temperature = data.main.temp;
  const temperatureFeelsLike = data.main["feels_like"];

  console.log(data.main);

  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;
  const location = data.name + ", " + data.sys.country;

  temperatureLabel.textContent = temperature + "°C";
  temperatureFeelsLikeLabel.textContent = temperatureFeelsLike + "°C";
  weatherDescriptionContainer.textContent = weatherDescription;
  locationContainer.textContent = location;
  weatherIconContainer.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" class="weather-icon">`;
}
