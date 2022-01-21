import express from "express"
const routes = express.Router();
import { checkOut, createStripeAcc, createStripeLink, getAccount, verifySession, checkSession, expireSession } from './controllers/stripeController'

routes.post('/checkout', checkOut)
routes.post('/createStripe', createStripeAcc)
routes.post('/createStripeLink', createStripeLink)
routes.post('/getStripeAcc', getAccount)
routes.post('/verifySession', verifySession)
routes.post('/checkSession', checkSession)
routes.post('/expireSession', expireSession)

export default routes