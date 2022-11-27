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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  let windElement = document.querySelector("#wind");

  celciusTemp = Math.round(response.data.main.temp);

  tempElement.innerHTML = `${currentTemp}`;
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  // windElement.innerHTML = response.data.main.visibility;
  windSpeed = response.data.wind.speed;
  windElement.innerHTML = `Wind speed: ${windSpeed}m/hr`;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4f1c03a70540f345ecd651bb7c938490";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//// Unit Conversion

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelcius);

search("Paris");
