//Imported Router from express and created a router
import { Router } from 'express';
const router = Router();

//import weatherRoutes from file
import weatherRoutes from './weatherRoutes.js';

//Defined the use of the weatherRoutes
router.use('/weather', weatherRoutes);

export default router;
