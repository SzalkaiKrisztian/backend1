import {Router} from "express";
import { deleteKonyvTorlese, getKonyv, getKonyvek, postKonyv, putchKonyvAtirasa } from "./controller.ts";

const KonyvRouter: Router = Router();

KonyvRouter.get("/books",getKonyvek);
KonyvRouter.get("/books/:id",getKonyv);

KonyvRouter.post("/books",postKonyv);

KonyvRouter.put("/books/:id",putchKonyvAtirasa);

KonyvRouter.delete("/books/:id",deleteKonyvTorlese)
export default KonyvRouter;