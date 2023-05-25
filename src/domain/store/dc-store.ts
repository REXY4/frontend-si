interface DcStore {
    dc : any,
    selectDc : string,
    setSelectDc(dc:string):Promise<void>;
    getAllDcStore(store_code: string): void;
}

export type { DcStore };
