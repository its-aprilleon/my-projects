let now = new Date();

now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#time");
today.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "29baaftfaf333ad6ca3704ob80d346c8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
function showCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#dataList");
  let city = userInput.value;
  searchCity(city);
}

function getCurrentCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let units = "metric";

function showWeather(response) {
  let city = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let currentConditions = document.querySelector("#description");
  let humidity = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#current-wind-speed");

  let currentCity = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let currentHumidity = response.data.temperature.humidity;
  let currentWind = Math.round(response.data.wind.speed);

  city.innerHTML = currentCity;
  currentTemp.innerHTML = temperature;
  currentConditions.innerHTML = description;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  windSpeed.innerHTML = `Wind: ${currentWind} km/h`;
}

function showPosition(position) {
  let apiKey = "29baaftfaf333ad6ca3704ob80d346c8";

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let userSearch = document.querySelector("#dataList");
userSearch.addEventListener("submit", showCity);

let currentLocationBtn = document.querySelector("#search-form");
currentLocationBtn.addEventListener("submit", getCurrentCoordinates);

searchCity("Yangon");
