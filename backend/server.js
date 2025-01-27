import express from 'express';
import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './Config/envVars.js';
import { connectDB } from './Config/db.js';
const app = express();
app.use(express.json());
const PORT = ENV_VARS.PORT;

app.use("/api/v1/auth", authRoutes);
app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
  connectDB();
});