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
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#searched-city-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#searched-city-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#searched-city-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#searched-city-title").innerHTML = response.data.name;
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
