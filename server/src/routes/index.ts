//Imported Router from express and created a router

import { Router } from 'express';
const router = Router();

//Imported the apiRoutes and htmlRoutes from their files
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

//Defined the use of the apiRoutes and htmlRoutes
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;
