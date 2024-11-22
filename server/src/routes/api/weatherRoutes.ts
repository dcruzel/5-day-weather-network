import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';
const router = Router();
dotenv.config();

import HistoryService from '../../service/historyService.js';
//import WeatherService from '../../service/weatherService.js';

// console.log(process.env.API_BASE_URL_LOC);
// console.log(process.env.API_BASE_URL_CITY);
// console.log(process.env.API_KEY);



// ADDED: POST Request with city name to retrieve weather data

// Path should be '/', but trying to add city path
router.post('/', async (req: Request, res: Response) => {

  //res.status(418).send("This hasn't been implemented yet");
  //TO DO: GET weather data from city name

  //ADDED: Add city to History Service
  try {
    const city = req.body;
    const citystatus = await HistoryService.addCity(city);
    res.json(citystatus);
  } catch (err){
    console.log(err);
    res.status(500).json(err);
  }

});

// ADDED: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const savedCities = await HistoryService.getCities();
    return res.json(savedCities);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// * ADDED: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try{
    if(!req.params.id){
      return res.status(400).json({msg: 'City id is required'});
    }
    await HistoryService.removeCity(req.params.id);
    return res.json({success: 'City successfully removed from search history'});
  } catch (err){
    console.log(err);
    return res.status(500).json(err);
  }
});

export default router;
