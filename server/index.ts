import env from 'dotenv'
import express from 'express';
import cors from 'cors'
import Stripe from "stripe"
import routes from './routes'

env.config()
const key = process.env.STRIPE_SECRET_KEY
export const stripe = new Stripe(key, null)

const app = express();
const port = 3001


app.use(cors({ // Required for cookies to client.  
    origin: ['http://localhost:3000', "https://examensprojekt-market.web.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(port, () => {
    console.log('The application is listening on port 3001!');
})

app.use(function(req, res, next) {
    const allowedOrigins = ['http://localhost:3000', "https://examensprojekt-market.web.app"];
    console.log(req.headers.origin)
    if(allowedOrigins.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    } 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use('/', routes)