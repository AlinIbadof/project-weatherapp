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

async function getProcessedData(location) {
  const data = await getWeatherInfo(location);

  const processedDataObj = createProcessedDataObject(data);

  return processedDataObj;
}

function createProcessedDataObject(data) {
  let processedData = {};

  processedData.temperature = data.main;
  processedData.clouds = data.clouds;
  processedData.coords = data.coord;
  processedData.wind = data.wind;
  processedData.timezone = data.timezone;
  processedData.weather = data.weather;

  return processedData;
}

//console.log(getWeatherInfo("Bucharest"));

console.log(getProcessedData("Bucharest"));
