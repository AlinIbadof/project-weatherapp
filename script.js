const searchBtn = document.querySelector(".searchbtn");

searchBtn.addEventListener("click", () => {
  removeDisplay();
  createDisplay(
    getProcessedData(`${document.getElementById("search").value}`),
    `${document.getElementById("search").value}`
    //remove all existing children (erase data)
  );
});

// functions to show the on-screen display
const weatherInfo = document.querySelector(".weatherinfotitle");
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const clouds = document.querySelector(".clouds");
const weather = document.querySelector(".weatherdescriptiondisplay");

function createDisplay(data, title) {
  createTitleDisplay(title);
  createTemperatureDisplay(data);
  createCloudsDisplay(data);
  createWindDisplay(data);
  createWeatherDisplay(data);
}

function removeDisplay() {
  while (weatherInfo.firstChild) {
    weatherInfo.removeChild(weatherInfo.lastChild);
  }
  while (temperature.firstChild) {
    temperature.removeChild(temperature.lastChild);
  }
  while (wind.firstChild) {
    wind.removeChild(wind.lastChild);
  }
  while (clouds.firstChild) {
    clouds.removeChild(clouds.lastChild);
  }
  while (weather.firstChild) {
    weather.removeChild(weather.lastChild);
  }
}

// function that fetches raw data from API, returns unprocessed object
async function getWeatherInfo(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d574e6e1be7e82f80e1b47d2b6ee1615&units=metric`,
      { mode: "cors" }
    );
    const json = await response.json();

    return json;
  } catch (err) {
    console.log(err);
  }
}

// function that processes the object received from getWeatherInfo, returns processed promise
async function getProcessedData(location) {
  const data = await getWeatherInfo(location);

  const processedDataObj = createProcessedDataObject(data);

  return processedDataObj;
}

function createProcessedDataObject(data) {
  let processedData = {};

  processedData.temperature = data.main;
  processedData.clouds = data.clouds;
  processedData.wind = data.wind;
  processedData.timezone = data.timezone;
  processedData.weather = data.weather;

  return processedData;
}

console.log(getProcessedData("Bucharest"));

/// Display creating functions -----------------------------------------------------

function createTitleDisplay(loc) {
  weatherInfo.textContent = `Weather info - Location: ${loc}`;
}

// function that displays on screen an icon of Temp and the current temperature
function createTemperatureDisplay(data) {
  // current temperature
  let tempIcon = document.createElement("img");
  tempIcon.classList.add("icon");
  tempIcon.setAttribute("src", "temp.svg");

  let tempText = document.createElement("p");
  let tempTextValue = data;

  tempTextValue.then(
    (value) =>
      (tempText.textContent =
        value.temperature.temp + " °C - Current Temperature")
  );

  let currentTemp = document.createElement("div");
  currentTemp.classList.add("temp1");
  currentTemp.appendChild(tempIcon);
  currentTemp.appendChild(tempText);
  // ------------

  // feels like temperature
  let feelsLikeIcon = document.createElement("img");
  feelsLikeIcon.classList.add("icon");
  feelsLikeIcon.setAttribute("src", "temp_feels_like.svg");

  let feelsLikeText = document.createElement("p");
  let feelsLikeTextValue = data;

  feelsLikeTextValue.then(
    (value) =>
      (feelsLikeText.textContent =
        value.temperature.feels_like + " °C - Feels Like")
  );

  let feelsLikeTemp = document.createElement("div");
  feelsLikeTemp.classList.add("temp2");
  feelsLikeTemp.appendChild(feelsLikeIcon);
  feelsLikeTemp.appendChild(feelsLikeText);
  // ------------

  // max temperature
  let maxTempIcon = document.createElement("img");
  maxTempIcon.classList.add("icon");
  maxTempIcon.setAttribute("src", "temp_max.svg");

  let maxTempText = document.createElement("p");
  let maxTempTextValue = data;

  maxTempTextValue.then(
    (value) =>
      (maxTempText.textContent =
        value.temperature.temp_max + " °C - Maximum Temperature")
  );

  let maxTemp = document.createElement("div");
  maxTemp.classList.add("temp3");
  maxTemp.appendChild(maxTempIcon);
  maxTemp.appendChild(maxTempText);
  // ------------

  // min temperature
  let minTempIcon = document.createElement("img");
  minTempIcon.classList.add("icon");
  minTempIcon.setAttribute("src", "temp_min.svg");

  let minTempText = document.createElement("p");
  let minTempTextValue = data;

  minTempTextValue.then(
    (value) =>
      (minTempText.textContent =
        value.temperature.temp_min + " °C - Minimum Temperature")
  );

  let minTemp = document.createElement("div");
  minTemp.classList.add("temp4");
  minTemp.appendChild(minTempIcon);
  minTemp.appendChild(minTempText);
  // ------------

  temperature.appendChild(currentTemp);
  temperature.appendChild(feelsLikeTemp);
  temperature.appendChild(maxTemp);
  temperature.appendChild(minTemp);
}

function createWindDisplay(data) {
  let windIcon = document.createElement("img");
  windIcon.classList.add("icon");
  windIcon.setAttribute("src", "windspeed.svg");

  let windText = document.createElement("p");
  let windTextValue = data;

  windTextValue.then(
    (value) => (windText.textContent = value.wind.speed + " km/h - Wind Speed")
  );

  let windSpeed = document.createElement("div");
  windSpeed.classList.add("windspeed");
  windSpeed.appendChild(windIcon);
  windSpeed.appendChild(windText);

  wind.appendChild(windSpeed);
}

function createCloudsDisplay(data) {
  let cloudsIcon = document.createElement("img");
  cloudsIcon.classList.add("icon");
  cloudsIcon.setAttribute("src", "cloudiness.svg");

  let cloudsText = document.createElement("p");
  let cloudsTextValue = data;

  cloudsTextValue.then(
    (value) => (cloudsText.textContent = value.clouds.all + " % - Cloudiness")
  );

  let cloudiness = document.createElement("div");
  cloudiness.classList.add("cloudinessperc");
  cloudiness.appendChild(cloudsIcon);
  cloudiness.appendChild(cloudsText);

  clouds.appendChild(cloudiness);
}

function createWeatherDisplay(data) {
  let weatherText = document.createElement("p");
  let weatherTextValue = data;

  weatherTextValue.then(
    (value) => (weatherText.textContent = value.weather.description)
  );

  let weatherDescription = document.createElement("div");
  weatherDescription.classList.add("weatherdesc");
  weatherDescription.appendChild(weatherText);

  weather.appendChild(weatherDescription);
}
