import express from "express";
const routes = express.Router()
import { getUserList, addUser } from "./controllers/userController";


routes.get("/user", getUserList)
routes.post("/test", addUser)

export default routes