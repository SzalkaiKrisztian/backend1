import type { Request, Response } from "express";
import { Konyv, KonytarManager } from "./manager.ts";
import type IKonyv from "./manager.ts";

export const getKonyvek = async (_req: Request, res: Response) => {
    const KM: KonytarManager = new KonytarManager();
    return res.json(await KM.TeljesKonyvtarKeszlet());
}

export const getKonyv = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const KM: KonytarManager = new KonytarManager();
        const konyv = await KM.EgyKonyv(parseInt(id as string));
        if(konyv ===undefined)
            return res.status(404).send("A könyv nem létezik!");
        else
            return res.json(konyv);
    } catch (error) {
        return res.status(404).send("A könyv nem létezik!")
    }
}

export const postKonyv = async (req: Request, res: Response) =>{
    try {
        if(!req.body || typeof req.body !== "object" || req.body.id ||
            !req.body.cim || !req.body.szerzo || !req.body.kiadasEve || !req.body.ar || !req.body.keszlet || !req.body.borito ||
            !Object.keys(req.body).every(key=>["cim","szerzo","kiadasEve","ar","keszlet","borito"].includes(key))
        )
            return res.status(400).send("Nem megfelelo adatok!");
        const konyv = new Konyv(req.body);
        const KM: KonytarManager = new KonytarManager();
        const id: number | undefined = await KM.KonyvFelvetele(konyv.toJSON())
        if(id===undefined)
            return res.status(500).send("Nem sikerult felvenni");
        else
            return res.status(201).json(id);
    } catch (error) {
        console.log(error);
        return res.status(400).send("Nem megfelelo adatok! catch");
    }
}