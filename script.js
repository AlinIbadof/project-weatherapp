const searchBtn = document.querySelector(".searchbtn");

searchBtn.addEventListener("click", () => {
  createTemperatureDisplay(
    getProcessedData(`${document.getElementById("search").value}`)
    //remove all existing children (erase data)
  );
});

// functions to show the on-screen display
const temperature = document.querySelector(".temperature");
const wind = document.querySelector(".wind");
const clouds = document.querySelector(".clouds");
const weather = document.querySelector(".weather");

// function that displays on screen an icon of Temp and the current temperature
function createTemperatureDisplay(data) {
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

  temperature.appendChild(tempIcon);
  temperature.appendChild(tempText);
}

function createWindDisplay() {}
function createCloudsDisplay() {}
function createWeatherDisplay() {}

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

//console.log(getWeatherInfo("Bucharest"));
console.log(getProcessedData("Bucharest"));
