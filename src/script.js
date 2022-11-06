//// Display Day & Time of Current Location
let now = new Date();
let day = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayTime = `${day} ${hours}:${minutes}`;

let displayDay = document.querySelector("h2");
displayDay.innerHTML = dayTime;

//// API Integration
function formatDate(timestamp) {
  let date = new Date(timestamp);
}

function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${currentTemp}°`;
}

let city = "San Diego";
let apiKey = "4f1c03a70540f345ecd651bb7c938490";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
