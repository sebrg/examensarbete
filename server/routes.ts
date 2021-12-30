import express from "express"
const routes = express.Router();
import { checkOut } from './controllers/stripeController'

routes.post('/checkout', checkOut)

export default routes