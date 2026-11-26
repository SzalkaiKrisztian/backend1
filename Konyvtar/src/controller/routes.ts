import {Router} from "express";
import { getKonyv, getKonyvek, postKonyv } from "./controller.ts";

const KonyvRouter: Router = Router();

KonyvRouter.get("/books",getKonyvek);
KonyvRouter.get("/books/:id",getKonyv);

KonyvRouter.post("/books",postKonyv);

export default KonyvRouter;