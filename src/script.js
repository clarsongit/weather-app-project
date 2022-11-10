//// API Integration
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day = days[date.getDay()];
  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}

function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${currentTemp}`;
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let city = "San Diego";
let apiKey = "4f1c03a70540f345ecd651bb7c938490";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);
