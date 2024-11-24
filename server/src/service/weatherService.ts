//import fs to write weather and dotenv to read API 
import dotenv from 'dotenv';
dotenv.config();

//5-day Forecast https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}&units=imperial
//Current weather https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial

// ADDED: Defined a class for the Weather object 

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

// ADDED: Completed the WeatherService class
class WeatherService {
   // ADDED: Defined the baseURL, API key, and city name properties
   // Added weatherArray and initialize a blank array
  private baseURL_Current?: string;
  private baseURL_Forecast?: string;
  private apiKey?: string;
  private weatherArray: Weather[]=[];

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

  // ADDED: Created buildWeatherQuery method
  private buildWeatherQuery(forecastWeather: any, i: number) {
    try{
      //Each 8 set is a different day of the weather for the next four days
      const weatherItem = forecastWeather.list[i*8];

      //Ensure weatherItem exists
      if (!weatherItem){
        return `Weather item not found`;
      }
      //Set API Weather forecast to push the properties to the Weather class
      const weatherInDays: Weather = {
        id: forecastWeather.city.id.toString(),
        cityName: forecastWeather.city.name,
        date: `${weatherItem.dt_txt.slice(5,7)}/${weatherItem.dt_txt.slice(8,10)}/${weatherItem.dt_txt.slice(0,4)}`,
        icon: weatherItem.weather[0].icon,
        iconDescription: weatherItem.weather[0].description,
        tempF: weatherItem.main.temp.toFixed(2),
        humidity: weatherItem.main.humidity.toString(),
        windSpeed: weatherItem.wind.speed.toString(),
      };
      //console.log(`FORECAST WEATHER ${i} DAY`);
      //console.log(weatherInDays);
      
      //Push the Weather into the array for 4 days in addition to the current weather
      this.weatherArray.push(weatherInDays);
      return weatherInDays;

    //Catch error below
    }catch(err){
      console.log('Error:', err);
      return err;
    }
  }

  

  // ADDED: Built parseCurrentWeather method
  private parseCurrentWeather (currentWeather: any) {
    try{  
      //get the current date 
      let currentDate = new Date();
      //console.log(`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`);
      //set the current weather API to the Weather properties
      const currentWeatherData: Weather = {
        id: currentWeather.id.toString(),
        cityName: currentWeather.name,
        date:`${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`,
        icon: currentWeather.weather[0].icon,
        iconDescription: currentWeather.weather[0].description,
        tempF: currentWeather.main.temp.toFixed(2),
        humidity: currentWeather.main.humidity.toString(),
        windSpeed: currentWeather.wind.speed.toString(),
      };
      //console.log(`CURRENT WEATHER`);
      //console.log(currentWeatherData);
      
      //Push the current weather object to the weatherArray.
      this.weatherArray.push(currentWeatherData);
      return currentWeatherData;
    //Catch any error below and display the error
    }catch(err){
      console.log('Error:', err);
      return err;
    }
  }
  
  // ADDED: Completed buildForecastArray method
  private buildForecastArray(currentWeather: any, weatherData: any) {
    try{
      //Initialize the weatherArray to blank
      this.weatherArray=[];

      //Run the first object of the WeatherArray using the parseCurrentWeather function
      this.parseCurrentWeather(currentWeather);

      //Run the second to fifth object of the WeatherArray using the buildWeatherQuery function and a for loop
      for (let i=1; i<5; i++){
        this.buildWeatherQuery(weatherData, i);
      }

      //Return the weatherArray of the 5 days of weather
      return this.weatherArray;
    //Catch any error below and display the error
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
      //Build the array with the current weather API data and the forecast weather API data
      const mappedWeather = this.buildForecastArray(weatherCurrent, weatherForecast);
      //Return the weather array of the 5-day forecast
      return mappedWeather;

    //Catch any error below and display the error
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
   }
 }
export default new WeatherService();
