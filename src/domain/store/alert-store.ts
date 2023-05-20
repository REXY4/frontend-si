interface AlertStore {
    isOpen : boolean | false,
    message : string | null,
    setAlert(isOpen:boolean, message:string):void
}

export type { AlertStore };
