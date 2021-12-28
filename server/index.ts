import express from 'express';
import cors from "cors";

import { config } from './config';

const app = express();
const port = 3001

app.use(cors({ // Required for cookies to client. 
    origin: 'http://localhost:3001',
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(port, () => {
    console.log('The application is listening on port 3001!', config);
})