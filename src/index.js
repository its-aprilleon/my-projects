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
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#dataList");
  searchCity(cityInputElement.value);
}

function showWeather(response) {
  let currentCity = response.data.city;
  let temperature = Math.round(response.data.daily[0].temperature.day);
  let description = response.data.daily[0].condition.description;
  let currentHumidity = response.data.daily[0].temperature.humidity;
  let currentWind = Math.round(response.data.daily[0].wind.speed);

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

// function showPosition(position) {
//   let apiKey = "29baaftfaf333ad6ca3704ob80d346c8";

//   let lat = position.coordinates.latitude;
//   let lon = position.coordinates.longitude;
//   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(showWeather);
// }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
