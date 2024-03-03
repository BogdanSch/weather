(function ($, undefined) {
  const cityForm = $("#cityForm");

  const infoContainer = $(".weather-card__content");
  const temperatureLabel = $("#temperature span");
  const temperatureFeelsLikeLabel = $("#temperatureFeelsLike span");
  const weatherDescriptionContainer = $("#weatherDescription");
  const locationContainer = $("#location");
  const weatherIconContainer = $("#weatherIcon");
  const coordinatesContainer = $("#coordinates");

  const cityInput = $("#city");

  cityForm.on("submit", function (event) {
    event.preventDefault();
    const cityName = cityInput.val();
    fetchWeatherData(cityName);
  });

  function fetchWeatherData(cityName) {
    const apiKey = "fada024d74ea8c82c596e30e55e3f9d1";

    $.getJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`,
      function (result) {
        displayWeatherData(result);
      }
    );
  }

  function displayWeatherData(data) {
    if (infoContainer.hasClass("hidden")) {
      infoContainer.removeClass("hidden");
    }

    const temperature = data.main.temp;
    const temperatureFeelsLike = data.main["feels_like"];

    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const location = data.name + ", " + data.sys.country;
    const coordinates = data.coord;

    temperatureLabel.text(temperature + "°C");
    temperatureFeelsLikeLabel.text(temperatureFeelsLike + "°C");
    weatherDescriptionContainer.text(weatherDescription);
    locationContainer.text(location);
    weatherIconContainer.html(
      `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon" class="weather-icon">`
    );
    coordinatesContainer.text(
      `Longtitude: ${coordinates.lon.toFixed(
        2
      )}, Latitude: ${coordinates.lat.toFixed(2)}`
    );
  }
})(jQuery);
