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
    
    origin: ['http://localhost:3000', "https://examensprojekt-market.web.app/"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(port, () => {
    console.log('The application is listening on port 3001!');
})

app.use('/', routes)