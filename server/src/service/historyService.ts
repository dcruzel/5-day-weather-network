//Import fs for writing and uuid for random unique number

import fs from 'node:fs/promises';
import { v4 as uuidv4} from 'uuid';

// ADDED: Defined a City class with name and id properties
class City {
  cityName: string; 
  id: string; 
  constructor(cityName:string, id: string){
    this.cityName = cityName;
    this.id = id; 
  }
}
// ADDED: Completed the HistoryService class
class HistoryService {
  // ADDED: Defined a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('../server/db/searchHistory.json', {
      flag: 'a+', 
      encoding: 'utf8',
    });
  }

  // ADDED: Defined a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('../server/db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  }

  // ADDED: Defined a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];

      // If cities isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }
  // Added: Defined an addCity method that adds a city to the searchHistory.json file
  async addCity( {cityName}: {cityName:string}) {
    if (!cityName) {
      throw new Error('city cannot be blank');
    }
    console.log(`City: ${cityName}`);
    // Added a unique id to the state using uuid package
    const newCity: City = { cityName: cityName, id: uuidv4() };
    // Get all cities, add the new city, write all the updated cities, return the newCity
    return await this.getCities()
      .then((cities) => {
        if (cities.find((index) => index.cityName === cityName)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }

  // * ADDED: Defined a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();
