import express from 'express';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from "./routes/tv.routes.js";
import { ENV_VARS } from './Config/envVars.js';
import { connectDB } from './Config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/ProtectRoutes.js';
import searchRoutes from './routes/search.routes.js';
const app = express();

const PORT = ENV_VARS.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use("/api/v1/tv",protectRoute, tvRoutes);
app.use("/api/v1/search",protectRoute, searchRoutes);
app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
  connectDB();
});

