let cityForm;

let temperatureContainer;
let weatherDescriptionContainer;
let locationContainer;
let weatherIcon;

document.addEventListener("DOMContentLoaded", function () {
  cityForm = document.getElementById("cityForm");
  const cityInput = document.getElementById("city");

  temperatureContainer = document.getElementById("temperature");
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
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;
  const weatherIcon = data.weather[0].icon;
  const location = data.name + ", " + data.sys.country;

  temperatureContainer.textContent = temperature + "°C";
  weatherDescriptionContainer.textContent = weatherDescription;
  locationContainer.textContent = location;
  weatherIconContainer.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" class="weather-icon">`;
}
