import express from "express";
const routes = express.Router()
import { getUserList } from "./userRoutes";

routes.get("/user", getUserList)

export default routes