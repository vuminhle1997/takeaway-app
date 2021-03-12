import express, { response } from 'express';
import DB from './db/fauna';
import cors from 'cors';
import { query } from 'faunadb';
import masterRoute from './routes';
import cookieParser from 'cookie-parser'
import path from 'path'
import fs from 'fs'
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ["http://localhost:3000", "http://localhost:80"], credentials: true}));

app.use(masterRoute);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

export default app;