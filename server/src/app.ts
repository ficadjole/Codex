import express from 'express';
import cors from 'cors';


require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


export default app;