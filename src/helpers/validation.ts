export const onlyValidationText = (value:string) => value.replace(/[^a-zA-Z0-9@!]/g, '').slice(0, 30);
export const onlyValidationNumber = (value:string) => value.replace(/[^0-9]/g, '').slice(0, 30);
