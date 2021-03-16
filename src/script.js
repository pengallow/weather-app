function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let currentCity = document.querySelector("#target-city");
  currentCity.innerHTML = `${searchInput.value}`;

  let city = `${searchInput.value}`;
  let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  function updateTemp(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let newTemp = document.querySelector("#search-temperature");
    newTemp.innerHTML = `${temperature}º`;

    function showFahrenheitTemperature(event) {
      event.preventDefault();
      let fahrenheitTemperature = (temperature * 9) / 5 + 32;
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let temperatureElement = document.querySelector("#search-temperature");
      temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
    }

    function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#search-temperature");
    temperatureElement.innerHTML = `${Math.round(temperature)}º`;
    }

    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", showCelsiusTemperature);

    let weatherIconElement = document.querySelector("#weather-icon");
    let weatherCondition = document.querySelector("#weather-description");
    let windElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity-percent");

    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherCondition.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
    humidityElement.innerHTML = `${response.data.main.humidity}%`;
  }

  function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
  }

  function displayForecast(response) {
      let forecastElement = document.querySelector("#forecast");
      forecastElement.innerHTML = null;
      let forecast = null;

      for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `<div class="col-2 text-center">
                            <h3>${formatHours(forecast.dt * 1000)}</h3>
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                            <div class="weather-forecast-temperature">
                                <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(forecast.main.temp_min)}º
                            </div>
                        </div>`
      }
    }

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// searchCity will update the name of the city and the temperature (in metric) after the user searches; code works currently 22/02/2021

function searchCityNow(event) {
  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKeyLocation = "pk.42b261a2635a12bf1a7a6310a9d020be";
    let apiUrlLocation = `https://us1.locationiq.com/v1/reverse.php?key=${apiKeyLocation}&lat=${latitude}&lon=${longitude}&format=json`;

    function showCityNow(response) {
      let currentLocationCity = response.data.address.county.replace(`City of`, ``);
      let userCurrentCity = document.querySelector("#target-city");
      let apiKeyWeather = "3b69d9e884899e81040ee4e357f33f8b";
      userCurrentCity.innerHTML = `${currentLocationCity}`;

      function formatHours(timestamp) {
      let date = new Date(timestamp);
      let hours = date.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${hours}:${minutes}`;
      }

      function displayForecast(response) {
        let forecastElement = document.querySelector("#forecast");
        forecastElement.innerHTML = null;
        let forecast = null;

        for (let index = 0; index < 6; index++) {
          forecast = response.data.list[index];
          forecastElement.innerHTML += `<div class="col-2 text-center">
                            <h3>${formatHours(forecast.dt * 1000)}</h3>
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
                            <div class="weather-forecast-temperature">
                                <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(forecast.main.temp_min)}º
                            </div>
                        </div>`
        }
      }
      apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentLocationCity}&units=metric&appid=${apiKeyWeather}`;
      axios.get(apiUrl).then(displayForecast);
    }
    axios.get(`${apiUrlLocation}`).then(showCityNow);

    let apiKeyWeather = "3b69d9e884899e81040ee4e357f33f8b";
    let apiLinkWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

    function showTemperature(response) {
      let currentTemp = Math.round(response.data.main.temp);
      let newTemp = document.querySelector("#search-temperature");
      newTemp.innerHTML = `${currentTemp}º`;

      function showFahrenheitTemperature(event) {
      event.preventDefault();
      let fahrenheitTemperature = (currentTemp * 9) / 5 + 32;
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let temperatureElement = document.querySelector("#search-temperature");
      temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
    }

    function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#search-temperature");
    temperatureElement.innerHTML = `${Math.round(currentTemp)}º`;
    }

    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", showCelsiusTemperature);

    let weatherIconElement = document.querySelector("#weather-icon");
    let weatherCondition = document.querySelector("#weather-description");
    let windElement = document.querySelector("#wind-speed");
    let humidityElement = document.querySelector("#humidity-percent");

    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherCondition.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
    humidityElement.innerHTML = `${response.data.main.humidity}%`;
    }
    axios.get(`${apiLinkWeather}&appid=${apiKeyWeather}`).then(showTemperature); 
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", searchCity);

let button = document.querySelector("#gps-location");
button.addEventListener("click", searchCityNow);

// installed axios in <head> 22/02/2021