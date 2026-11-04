import type {Request,Response} from "express";
import data from "../data/data.ts";
import {Kerekpar,KerekparManager} from "./Manager.ts";
import type IKerekpar from "./Manager.ts";

const KM:KerekparManager = new KerekparManager(data);

export const getALLKerekparJSON=(_req:Request,res:Response)=>{
    res.json(KM.AllKerekparJSON());
}

export const getKerekparById=(req:Request,res:Response)=>{
    const {id} = req.params;
    const kerekpar:Kerekpar | undefined = KM.KerekparById(parseInt(id as string))
    if(kerekpar===undefined)
        return res.status(404).send("NOT FOUND");
    res.json(kerekpar?.toJSON());
}

export const postKerekparHozzaadasa=(req:Request,res:Response)=>{
    const kerekpar:Kerekpar= new Kerekpar(req.body);
    if(Object.values(kerekpar).slice(1).some(s=>s==0 || s=='') || !req.body || typeof req.body !== "object" || Object.keys(req.body).length==0 || req.body.id
    || Object.keys(req.body).length != Object.keys(data[0] as Kerekpar).length-1
    || Object.values(req.body).some(s=>s===undefined))
        return res.status(400).send("BAD REQUEST");
    if(KM.KerekparHozzaadasa(kerekpar)===undefined)
        return res.status(404).send("NOT FOUND");
    res.status(201).send("CREATED");
}

export const patchKerekparModositasa=(req:Request,res:Response)=>{
    const {id} = req.params;
    const modositas:IKerekpar=req.body;
    if(!req.body || typeof req.body !== "object" || Object.keys(req.body).length==0 
    || req.body.id || Object.values(req.body).some(s=>s===undefined))
        return res.status(400).send("BAD REQUEST");
    if(KM.KerekparModositasa(parseInt(id as string),modositas)===undefined)
        return res.status(404).send("NOT FOUND");
    res.status(200).send("Sikeres Modositas");

}

export const putKerekparModositasa=(req:Request,res:Response)=>{
    const {id} = req.params;
    const modositas:IKerekpar=req.body;
    if(!req.body || typeof req.body !== "object" || Object.keys(req.body).length==0 || req.body.id
    || Object.keys(req.body).length != Object.keys(data[0] as Kerekpar).length-1
    || Object.values(req.body).some(s=>s===undefined))
        return res.status(400).send("BAD REQUEST");
    if(KM.KerekparModositasa(parseInt(id as string),modositas,true)===undefined)
        return res.status(404).send("NOT FOUND");
    res.status(200).send("Sikeres Modositas");
}

export const deleteKerekpartorlese=(req:Request,res:Response)=>{
    const {id} = req.params;
    if(KM.KerekparTorlese(parseInt(id as string))==false)
        return res.status(404).send("NOT FOUND");
    res.status(204).send("DELETED");
}