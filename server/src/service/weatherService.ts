//import fs to write weather and dotenv to read API 
//import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

//5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
//Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

// ADDED: Define a class for the Weather object: 

interface Weather {
   id: string;
   cityName: string;
   date: string;
   icon: string;
   iconDescription: string;
   tempF: string;
   windSpeed: string;
   humidity: string;
 }

// ADDED: Complete the WeatherService class
class WeatherService {
   // TODO: Define the baseURL, API key, and city name properties
  private baseURL_Current?: string;
  private baseURL_Forecast?: string;
  private apiKey?: string;

  constructor(){
    this.baseURL_Current = process.env.API_BASE_URL_CURRENT || '';
    this.baseURL_Forecast = process.env.API_BASE_URL_FORECAST || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // REMOVED: TODO: Create fetchLocationData method
  // REMOVED: private async fetchLocationData(query: string) {}
  // REMOVED: TODO: Create destructureLocationData method
  // REMOVED: private destructureLocationData(locationData: Coordinates): Coordinates {}
  // REMOVED: TODO: Create buildGeocodeQuery method
  // REMOVED: private buildGeocodeQuery(): string {}
  // REMOVED: TODO: Create fetchAndDestructureLocationData method
  // REMOVED: private async fetchAndDestructureLocationData() {}

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  
  // ADDED: Complete buildForecastArray method
  private buildForecastArray(currentWeather: any, weatherData: any[]) {
    //console.log(currentWeather);
    console.log(weatherData);
    const currentDate = new Date();
    const weatherArray: Weather[]=[];
    const currentWeatherData: Weather = {
      id: currentWeather.id.toString(),
      cityName: currentWeather.name,
      date: currentDate.toString(),
      icon: currentWeather.weather[0].icon,
      iconDescription: currentWeather.weather[0].description,
      tempF: currentWeather.main.temp.toFixed(2),
      humidity: currentWeather.main.humidity.toString(),
      windSpeed: currentWeather.wind.speed.toString(),
    };
    console.log(currentWeatherData);
    weatherArray.push(currentWeatherData);
    console.log(weatherArray[0]);
    return weatherArray;
  }
  
  // ADDED: Complete getWeatherForCity method

  //5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
//Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

async getWeatherForCity({cityName}: {cityName:string}) {
    try {
      console.log(`${this.baseURL_Current}${cityName}&appid=${this.apiKey}&units=imperial`);
      const responseCurrent = await fetch(
        `${this.baseURL_Current}${cityName}&appid=${this.apiKey}&units=imperial`
      );
      console.log(`${this.baseURL_Forecast}${cityName}&appid=${this.apiKey}&units=imperial`);
      const responseForecast = await fetch(
        `${this.baseURL_Forecast}${cityName}&appid=${this.apiKey}&units=imperial`
      );
      const weatherCurrent = await responseCurrent.json();
      console.log(`CURRENT WEATHER`);
      console.log(weatherCurrent);
      const weatherForecast = await responseForecast.json();
      console.log(`FORECAST WEATHER`);
      console.log(weatherForecast);
      const mappedWeather = this.buildForecastArray(weatherCurrent, weatherForecast);
    
      return mappedWeather;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
   }
 }
export default new WeatherService();
