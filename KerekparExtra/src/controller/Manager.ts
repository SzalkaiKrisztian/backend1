export default interface IKerekpar {
    id: number;
    nev: string;
    leiras: string;
    ar: number;
    raktaron: number;
    kep: string
}

export class Kerekpar implements IKerekpar {
    constructor(kerekpar: Partial<IKerekpar> = {}) {
        this._id = kerekpar.id ?? 0;
        this._nev = kerekpar.nev ?? '';
        this._leiras = kerekpar.leiras ?? '';
        this._ar = kerekpar.ar ?? 0;
        this._raktaron = kerekpar.raktaron ?? 0;
        this._kep = kerekpar.kep ?? '';
    }
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _nev: string;
    public get nev(): string {
        return this._nev;
    }
    public set nev(value: string) {
        this._nev = value;
    }
    private _leiras: string;
    public get leiras(): string {
        return this._leiras;
    }
    public set leiras(value: string) {
        this._leiras = value;
    }
    private _ar: number;
    public get ar(): number {
        return this._ar;
    }
    public set ar(value: number) {
        this._ar = value;
    }
    private _raktaron: number;
    public get raktaron(): number {
        return this._raktaron;
    }
    public set raktaron(value: number) {
        this._raktaron = value;
    }
    private _kep: string;
    public get kep(): string {
        return this._kep;
    }
    public set kep(value: string) {
        this._kep = value;
    }
    toJSON(): IKerekpar {
        return {
            id:this._id,
            nev:this.nev,
            leiras:this.leiras,
            ar:this.ar,
            raktaron:this.raktaron,
            kep:this.kep
        }
    }
}

export class KerekparManager{
    private _KerekparList:Kerekpar[]=[];
    constructor(data:IKerekpar[]){
        this._KerekparList=data.map(k=>new Kerekpar(k));
    }
    AllKerekparJSON():IKerekpar[]{
        return this._KerekparList.map(k=>k.toJSON());
    }

    KerekparById(id:number):Kerekpar | undefined{
        return this._KerekparList.find(k=>k.id==id);
    }

    KerekparHozzaadasa(kerekpar:Partial<IKerekpar>,id:number | undefined =undefined):Kerekpar | undefined{
        if(id!==undefined)
            kerekpar.id=id;
        else{
            let maxI:number=0;
            for(let i = 0; i<this._KerekparList.length;i++){
                if(maxI < (this._KerekparList[i]?.id as number))
                    maxI=(this._KerekparList[i]?.id as number);
            }
            kerekpar.id=maxI+1;
        }
        this._KerekparList.push(new Kerekpar(kerekpar));
        return this.KerekparById(kerekpar.id);
    }

    KerekparModositasa(id:number,modositas:Partial<IKerekpar>,put:boolean=false):Kerekpar | undefined{
        const kerekpar:Kerekpar |undefined=this.KerekparById(id);
        if(kerekpar ===undefined && put){
            this.KerekparHozzaadasa(modositas,id);
        }else if(kerekpar ===undefined && !put){
            return undefined;
        }else{
            Object.keys(modositas).forEach(key=>{
                const reqKey = key as keyof IKerekpar;
                if(modositas[reqKey] !== undefined)
                    (kerekpar as any)[reqKey] =modositas[reqKey];
            });
        }
        return kerekpar;
    }

    KerekparTorlese(id:number):boolean{
        const index = this._KerekparList.findIndex(k=>k.id==id);
        if(index===-1)
            return false;
        this._KerekparList.splice(index,1);
        return true;
    }
}