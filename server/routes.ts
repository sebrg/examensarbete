import express from "express"
const routes = express.Router();
import { checkOut, createStripeAcc, createStripeLink, getAccount, verifySession } from './controllers/stripeController'

routes.post('/checkout', checkOut)
routes.post('/createStripe', createStripeAcc)
routes.post('/createStripeLink', createStripeLink)
routes.post('/getStripeAcc', getAccount)
routes.post('/verifySession', verifySession)

export default routes