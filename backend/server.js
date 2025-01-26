
import express from 'express';
const app = express();
app.use("/api/v1/auth", authRouter);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});