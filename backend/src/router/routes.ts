import express from "express";
import { SendMessageController } from "../controllers/sendMessages";

const routes = express();

routes.post('/message', new SendMessageController().handle)

export default routes;