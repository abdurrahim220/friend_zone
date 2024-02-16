import express from 'express';
import { logOut, login, signUp } from '../controllers/authControllers.js';

const router = express.Router();

router.post("/signup", signUp)
      .post('/login', login)
      .post('/logout', logOut);

export default router;
