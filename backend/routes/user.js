import express from 'express'
import protectRoute from '../middleware/protectRoutes.js';
import { getUserForSidebar } from '../controllers/userControler.js';


const router = express.Router();

router.get('/',protectRoute,getUserForSidebar)

export default router;