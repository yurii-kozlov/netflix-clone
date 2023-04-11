require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
      app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
  } catch (error) {
      console.log(error);
  }
}

start();
