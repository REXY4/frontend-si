export const validationText = (value:string) => value.replace(/[^a-zA-Z0-9@!]/g, '').slice(0, 30);
export const validationJustNumber = (value:string) => value.replace(/[^0-9]/g, '').slice(0, 30);
