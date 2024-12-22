const apiKey = "d75b59b6d227ba111ae0cf0a80fba536";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select DOM elements
let searchInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let weatherImg = document.querySelector("#weather-img");
let temperature = document.querySelector("#temp");
let place = document.querySelector("#city-name");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind");
let weather = document.querySelector("#weather");

searchBtn.addEventListener("click", () => {
  let city = searchInput.value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  let api = `https://wttr.in/${city}?format=j1`;
  // let fullApiUrl = `${apiUrl}${city}&appid=${apiKey}`;

  let promise = fetch(api);
  promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`this situation is problematic`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let temp = data.current_condition[0].temp_C;
      let wind = (windSpeed.innerText =
        data.current_condition[0].windspeedKmph);
      let areaName = data.nearest_area[0].areaName[0].value;
      let country = data.nearest_area[0].country[0].value;
      let region = data.nearest_area[0].region[0].value;
      let fullLocation = `${areaName},${region},${country}`;
      let windDirection = data.current_condition[0].winddir16Point;
      let weatherDescription = data.current_condition[0].weatherDesc[0].value;
      let humidityValue = data.current_condition[0].humidity;
      place.innerText = `Place : ${fullLocation}`;
      windSpeed.innerText = `Wind : ${windDirection} ${wind} km/h`;
      temperature.innerText = `${temp}°c`;
      weather.innerText = `Weather : ${weatherDescription}`;
      humidity.innerText = `Humidity : ${humidityValue}%`;

      const now = new Date();
      const currentTime = now.toLocaleTimeString();
      // console.log(currentTime);

      // day logic
      if (temp <= 16) {
        weatherImg.src = "./weather-img/snowy.png";
      } else if (weatherDescription.toLowerCase().includes("rain")) {
        weatherImg.src = "./weather-img/rain.png";
      } else if (weatherDescription.toLowerCase().includes("cloudy")) {
        weatherImg.src = "./weather-img/cloudy.png";
      } else if (weatherDescription.toLowerCase().includes("sunny")) {
        weatherImg.src = "./weather-img/sunny.png";
      } else {
        weatherImg.src = "./weather-img/normalDay.png";
      }

      // // night logic
      // if (
      //   currentTime.toString() >= "07:00:00 PM" ||
      //   currentTime.toString() <= "06:00:00 AM"
      // ) {
      //   if (temp <= 16) {
      //     weatherImg.src = "./weather-img/moonSnow.png";
      //   } else {
      //     weatherImg.src = "./weather-img/moon.png";
      //   }
      //   // console.log("done");
      // }
    })
    .catch();
  {
    weatherImg.src = "./weather-img/error.png";
  }
});
