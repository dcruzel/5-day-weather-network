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
  // REMOVED: Create fetchWeatherData method
  // REMOVED: private async fetchWeatherData(coordinates: Coordinates) {}

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(forecastWeather: any[], i: number) {
    try{
      const weatherItem = forecastWeather.list[i];
      const weatherInDays: Weather = {
        id: forecastWeather.city.id.toString(),
        cityName: forecastWeather.city.name,
        date: weatherItem.dt_txt.slice(0,10),
        icon: weatherItem.weather[0].icon,
        iconDescription: weatherItem.weather[0].description,
        tempF: weatherItem.main.temp.toFixed(2),
        humidity: weatherItem.main.humidity.toString(),
        windSpeed: weatherItem.wind.speed.toString(),
      };
      return weatherInDays;
    }catch(err){
      console.log('Error:', err);
      return err;
    }
  }

  

  // ADDED: Build parseCurrentWeather method
  private parseCurrentWeather (currentWeather: any) {
    try{  
      const currentDate = new Date();
      const currentWeatherData: Weather = {
        id: currentWeather.id.toString(),
        cityName: currentWeather.name,
        date:`${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
        icon: currentWeather.weather[0].icon,
        iconDescription: currentWeather.weather[0].description,
        tempF: currentWeather.main.temp.toFixed(2),
        humidity: currentWeather.main.humidity.toString(),
        windSpeed: currentWeather.wind.speed.toString(),
      };
      return currentWeatherData;
    }catch(err){
      console.log('Error:', err);
      return err;
    }
  }
  
  // ADDED: Complete buildForecastArray method
  private buildForecastArray(currentWeather: any, weatherData: any[]) {
    try{
      console.log(weatherData);
      const weatherArray: Weather[]=[];
      let currentWeatherData : Weather;
      currentWeatherData=this.parseCurrentWeather(currentWeather); 
      weatherArray.push(currentWeatherData);
      console.log(weatherArray[0]);
      let forecastWeatherData:Weather;
      for (let i=1; i<5; i++){
        forecastWeatherData=this.buildWeatherQuery(weatherData, i);
        weatherArray.push(forecastWeatherData);
      }
      return weatherArray;
    }catch(err){
      console.log('Error:', err);
      return err;
    }
  }
  
  // ADDED: Complete getWeatherForCity method

  //5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
  //Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

async getWeatherForCity({cityName}: {cityName:string}) {
    try {
      //Check if the fetch API link for current weather is right
      //console.log(`${this.baseURL_Current}${cityName}&appid=${this.apiKey}&units=imperial`);
      
      //Fetch the api current weather information and store response in weatherCurrent
      const responseCurrent = await fetch(
        `${this.baseURL_Current}${cityName}&appid=${this.apiKey}&units=imperial`
      );
      
      //Check if the fetch API link for forecast weather is right
      //console.log(`${this.baseURL_Forecast}${cityName}&appid=${this.apiKey}&units=imperial`);

      //Fetch the api forecast weather information and store response in weatherForecast
      const responseForecast = await fetch(
        `${this.baseURL_Forecast}${cityName}&appid=${this.apiKey}&units=imperial`
      );
      const weatherCurrent = await responseCurrent.json();
      
      const weatherForecast = await responseForecast.json();
      
      const mappedWeather = this.buildForecastArray(weatherCurrent, weatherForecast);
    
      return mappedWeather;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
   }
 }
export default new WeatherService();
