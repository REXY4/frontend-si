interface AlertStore {
    isOpen : boolean | false,
    message : string,
    setAlert(isOpen:boolean, message:string):void
}

export type { AlertStore };
