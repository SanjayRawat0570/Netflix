import express from 'express';
import { signup, login , logout  } from '../Controller/authcontroller.js';
import { authCheck } from '../Middleware/authCheck.js';
import { protectRoute } from '../Middleware/ProtectRoutes.js';
const router = express.Router();    
 router.post("/signup", signup);
    router .post("/login",login);
    router.post("/logout",logout);

    router.get("/authcheck", protectRoute, authCheck);
export default router;