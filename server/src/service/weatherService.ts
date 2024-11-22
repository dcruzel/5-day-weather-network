//import fs to write weather and dotenv to read API 
//import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

//5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
//Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

// ADDED: Define a class for the Weather object: 

// interface Weather {
//   city: string;
//   icon: string;
//   date: string;
//   iconDescription: string;
//   tempF: string;
//   humidity: string;
//   windSpeed: string;
// }

// ADDED: Complete the WeatherService class
class WeatherService {
   // TODO: Define the baseURL, API key, and city name properties
  // private baseURL_Current?: string;
  // private baseURL_Forecast?: string;
  // private apiKey?: string;

  // constructor(){
  //   this.baseURL_Current = process.env.API_BASE_URL_CURRENT || '';
  //   this.baseURL_Forecast = process.env.API_BASE_URL_FORECAST || '';
  //   this.apiKey = process.env.API_KEY || '';
  // }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(): string {
  
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method

  //5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
//Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial
//Remove city: string -> Need to add back to parameter 
async getWeatherForCity() {
  //   try {
  //     const response = await fetch(
  //       `${this.baseURL}/parks?limit=10&stateCode=${city}&api_key=${this.apiKey}`
  //     );

  //     const parks = await response.json();

  //     const mappedParks = await this.parkDataMapping(parks.data);
  //     return mappedParks;
  //   } catch (err) {
  //     console.log('Error:', err);
  //     return err;
  //   }
   }
 }
export default new WeatherService();
