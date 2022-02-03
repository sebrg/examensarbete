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


/* app.use(cors({ // Required for cookies to client.  
    origin: ['http://localhost:3000', "https://examensprojekt-market.web.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
 */

const allowedOrigins = ['http://localhost:3000', 'https://examensprojekt-market.web.app']
const corsOptionsDelegate = async function (req: any, callback: any) {
  let corsOptions;
  if (allowedOrigins.includes(req.headers.origin)) {
    corsOptions = { origin: true, credentials: true, methods: ["GET", "POST", "DELETE", "HEAD", "OPTIONS"], allowedHeaders: ['X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'] }
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


app.use(cors(corsOptionsDelegate))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(port, () => {
    console.log('The application is listening on port 3001!');
})

/* app.use('/', routes, function(req, res, next) { //Kollar om origin är tillåten
    const allowedOrigins = ['http://localhost:3000', "https://examensprojekt-market.web.app"];
    console.log(req.headers.origin)
    if(allowedOrigins.includes(req.headers.origin)) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, application/json');
    } 
    next();
}); */

app.use('/', routes)