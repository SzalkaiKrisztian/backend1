import config from "../app/config.ts";
import mysql from "mysql2/promise"
import type {ResultSetHeader} from "mysql2/promise"

export default interface IKonyv {
    //id auto_Increment
    cim: string,
    szerzo: string,
    kiadasEve: number,
    ar: number,
    keszlet: number,
    borito: string | null
}

export class Konyv implements IKonyv {
    constructor(konyv: Partial<IKonyv> = {}) {
        this._cim = konyv.cim ?? '';
        this._szerzo = konyv.szerzo ?? '';
        this._kiadasEve = konyv.kiadasEve ?? 0;
        this._ar = konyv.ar ?? 0;
        this._keszlet = konyv.keszlet ?? 1;
        this._borito = konyv.borito ?? null;
    }
    private _borito: string | null;
    public get borito(): string | null {
        return this._borito;
    }
    public set borito(value: string | null) {
        if(value?.includes("<") || value?.includes(">"))
            throw Error();
        this._borito = value;
    }
    private _cim: string;
    public get cim(): string {
        return this._cim;
    }
    public set cim(value: string) {
        if(value.length>50 || value == '')
            throw Error();
        this._cim = value;
    }
    private _szerzo: string;
    public get szerzo(): string {
        return this._szerzo;
    }
    public set szerzo(value: string) {
        if(value.length>50 || value == '')
            throw Error();
        this._szerzo = value;
    }
    private _kiadasEve: number;
    public get kiadasEve(): number {
        return this._kiadasEve;
    }
    public set kiadasEve(value: number) {
        if(value<1900)
            throw Error();
        this._kiadasEve = value;
    }
    private _ar: number;
    public get ar(): number {
        return this._ar;
    }
    public set ar(value: number) {
        if(value<=0)
            throw Error();
        this._ar = value;
    }
    private _keszlet: number;
    public get keszlet(): number {
        return this._keszlet;
    }
    public set keszlet(value: number) {
        if(value<0)
            throw Error();
        this._keszlet = value;
    }
    toJSON(): IKonyv {
        return {
            cim: this.cim,
            szerzo: this.szerzo,
            kiadasEve: this.kiadasEve,
            ar: this.ar,
            keszlet: this.keszlet,
            borito: this.borito
        }
    }
}

export class KonytarManager{
    public async TeljesKonyvtarKeszlet():Promise<IKonyv[]>{
        try {
            const kapcs = await mysql.createConnection(config);
            const [rows] = await kapcs.query("SELECT * FROM konyv;");
            await kapcs.end();
            return rows as IKonyv[];
        } catch (error) {
            console.log(error);
            return[];
        }
    }

    public async EgyKonyv(id:number):Promise<IKonyv | undefined>{
        try {
            const kapcs = await mysql.createConnection(config);
            const [row] = await kapcs.query<ResultSetHeader>("SELECT * FROM konyv WHERE konyv.id = ?",[id]) as unknown as [IKonyv[]];
            await kapcs.end();
            return row[0] as IKonyv | undefined
        } catch (error) {
            console.log(error);
            Promise.reject();
        }
    }

    public async KonyvFelvetele(konyv:Partial<IKonyv>):Promise<number | undefined>{
        try {
            const kapcs = await mysql.createConnection(config);
            const [row] = await kapcs.query<ResultSetHeader>("INSERT INTO konyv SET ?;",[konyv]);
            await kapcs.end();
            if(row.affectedRows ==0)
                return undefined;
            return row.insertId;
        } catch (error) {
            console.log(error);
            Promise.reject();
        }
    }

    public async KonyvModositasa(id:number,modositas:Partial<IKonyv>): Promise<boolean | undefined>{
        try {
            const kapcs = await mysql.createConnection(config);
            const [row] = await kapcs.query<ResultSetHeader>("UPDATE konyv SET ? WHERE konyv.id=?;",[modositas, id]);
            await kapcs.end();
            if(row.affectedRows==0)
                return false;
            return true;
        } catch (error) {
            Promise.reject(error);
        }
    }

    public async KonyvTorlese(id:number) : Promise<void | undefined>{
        try {
            const kapcs = await mysql.createConnection(config);
            const [row] = await kapcs.query<ResultSetHeader>("DELETE FROM konyv WHERE konyv.id = ?;",[id]);
            await kapcs.end();
            if(row.affectedRows==0)
                Promise.reject("0 rows");
        } catch (error) {
            Promise.reject(error);
        }
    }
}