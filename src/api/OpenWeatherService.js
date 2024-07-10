import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});
console.log(process.env.REACT_APP_X_RAPID_API_KEY)
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

export async function fetchWeatherData(lat, lon) {
  try {
    const weatherResponse = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    const forecastResponse = await axios.get(`${WEATHER_API_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    console.log(weatherResponse.data, forecastResponse.data);
    return [weatherResponse.data, forecastResponse.data];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await axiosInstance.get('/cities', {
      params: {
        minPopulation: 10000,
        namePrefix: input,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
