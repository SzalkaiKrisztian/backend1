import {Router} from "express";
import {getALLKerekparJSON,getKerekparById,postKerekparHozzaadasa,deleteKerekpartorlese,patchKerekparModositasa,putKerekparModositasa} from "./controller.ts";
const apiRouter:Router=Router();

apiRouter.get('/api/bicycle',getALLKerekparJSON);
apiRouter.get('/api/bicycle/:id',getKerekparById);

apiRouter.post('/api/bicycle',postKerekparHozzaadasa);

apiRouter.patch('/api/bicycle/:id',patchKerekparModositasa);
apiRouter.put('/api/bicycle/:id',putKerekparModositasa);

apiRouter.delete('/api/bicycle/:id',deleteKerekpartorlese);

export default apiRouter;