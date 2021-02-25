function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let currentCity = document.querySelector("#target-city");
  currentCity.innerHTML = `${searchInput.value}`;

  let city = `${searchInput.value}`;
  let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  function updateTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let newTemp = document.querySelector("#search-temperature");
    newTemp.innerHTML = `${temperature}º`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateTemp);
}

let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", searchCity);

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
      userCurrentCity.innerHTML = `${currentLocationCity}`;
    }
    axios.get(`${apiUrlLocation}`).then(showCityNow);

    let apiKeyWeather = "3b69d9e884899e81040ee4e357f33f8b";
    let apiLinkWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

    function showTemperature(response) {
      let currentTemp = Math.round(response.data.main.temp);
      let newTemp = document.querySelector("#search-temperature");
      newTemp.innerHTML = `${currentTemp}º`;
    }
    axios.get(`${apiLinkWeather}&appid=${apiKeyWeather}`).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("#gps-location");
button.addEventListener("click", searchCityNow);

// don't use onclick here. or onlick, for that matter. thanks, Andrés xD

let now = new Date();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];
let day = days[now.getDay()];

let today = document.querySelector("#weekday");
today.innerHTML = `${day}`;

let timeNow = document.querySelector("#time");
let hour = now.getHours();
let minutes = now.getMinutes();
timeNow.innerHTML = `${hour}:${minutes}`;

function displayFarenheit() {
  let tempFarenheit = document.querySelector("#search-temperature");
  tempFarenheit.innerHTML = `42.8º`;
}
let convertFarenheit = document.querySelector("#farenheit");
convertFarenheit.addEventListener("click", displayFarenheit);

function displayCelsius() {
  let tempCelsius = document.querySelector("#search-temperature");
  tempCelsius.innerHTML = `6º`;
}
let convertCelsius = document.querySelector("#celsius");
convertCelsius.addEventListener("click", displayCelsius);

// installed axios in <head> 22/02/2021

