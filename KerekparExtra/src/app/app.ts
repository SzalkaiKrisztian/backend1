import express from "express";
import cors from "cors";
import router from "../routes/route.ts";
import apiRouter from "../controller/routes.ts";
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(router);
app.use(apiRouter);

export default app;