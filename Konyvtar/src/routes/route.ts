import {Router} from "express";
import type { Request,Response } from "express";
const router: Router = Router();

router.get('/',(_req:Request, res:Response)=>{
    return res.send("A Könyvtár nyilvántartója fut!");
});

export default router;