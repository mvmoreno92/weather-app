//date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todaysDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septembre",
  "October",
  "November",
  "December",
];
let todaysMonth = months[now.getMonth()];
let todaysDate = now.getDate();
let todaysHour = now.getHours();
if (todaysHour < 10) {
  todaysHour = `0${todaysHour}`;
}
let todaysMinute = now.getMinutes();
if (todaysMinute < 10) {
  todaysMinute = `0${todaysMinute}`;
}
let ending = "th";
if (todaysDate === 1 || todaysDate === 21 || todaysDate === 31) {
  ending = "st";
}
if (todaysDate === 2 || todaysDate === 22) {
  ending = "nd";
}
if (todaysDate === 3 || todaysDate === 23) {
  ending = "rd";
}

let dateDisplay = document.querySelector("#todays-date");

dateDisplay.innerHTML = `Today, <br /> ${todaysDay} ${todaysMonth} ${todaysDate}${ending} <br /> ${todaysHour}h${todaysMinute}`;

//Display searched City conditions

function displayCurrent(response) {
  celsiusTemp = Math.round(response.data.main.temp);

  document.querySelector("#temperature-value").innerHTML = celsiusTemp;
  document.querySelector("#searched-city-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#searched-city-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#searched-city-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#searched-city-title").innerHTML = response.data.name;

  document
    .querySelector("#searched-city-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#searched-city-icon")
    .setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "903b37cf5e8eae98d7b3d767f19c3d2a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrent);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}

let selectCity = document.querySelector("#search-form");
selectCity.addEventListener("submit", handleSubmit);

//current location
function getPosition(position) {
  document.querySelector("#search-bar").value = null;
  let apiKey = "903b37cf5e8eae98d7b3d767f19c3d2a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrent);
}

function navigate(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let clickCurrentButton = document.querySelector("#current-position-button");
clickCurrentButton.addEventListener("click", navigate);
//Change temperature unit
//to  farenheit
function change2Farenheit(event) {
  event.preventDefault();
  let displayFarenheit = document.querySelector("#temperature-value");
  displayFarenheit.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  event.target.style.opacity = 100;
  document.getElementById("celsius").style.opacity = "50%";
}

let selectFarenheit = document.querySelector("#farenheit");
selectFarenheit.addEventListener("click", change2Farenheit);

//to celsius
function change2Celsius(event) {
  event.preventDefault();
  let displayCelsius = document.querySelector("#temperature-value");
  displayCelsius.innerHTML = celsiusTemp;
  event.target.style.opacity = 100;
  document.getElementById("farenheit").style.opacity = "50%";
}

let selectCelsius = document.querySelector("#celsius");
selectCelsius.addEventListener("click", change2Celsius);

let celsiusTemp = null;

//week forecast
function displayWeekForecast(response) {
  console.log(response.data);
  let weekForecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `      
          <div class="col-2 week-forecast">
            <div id="week-day">${day}</div>
            <img
              src="http://openweathermap.org/img/wn/10d@2x.png"
              id="icon-day-forecast"
              width="50px"
            />
            <div id="week-temp">
              <span id="week-temp-max">21°</span>
              <span id="week-temp-min">15°</span>
            </div>
          </div>
       `;
  });

  forecastHTML = forecastHTML + ` </div>`;
  weekForecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "903b37cf5e8eae98d7b3d767f19c3d2a";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeekForecast);
}
search("Paris");
