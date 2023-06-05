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
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
  let currentCity = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);

  let city = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let currentConditions = document.querySelector("#description");
  let humidity = document.querySelector("#current-humidity");
  let windSpeed = document.querySelector("#current-wind-speed");

  currentTemp.innerHTML = temperature;
  currentConditions.innerHTML = description;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  windSpeed.innerHTML = `Wind: ${currentWind} km/h`;
  city.innerHTML = currentCity;
}
searchCity("Yangon");

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let Usersearch = document.querySelector("#dataList");
Usersearch.addEventListener("click", showCity);

let currentLocationBtn = document.querySelector("#id1");
currentLocationBtn.addEventListener("click", getCurrentCoordinates);
