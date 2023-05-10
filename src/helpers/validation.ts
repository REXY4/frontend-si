export const validationText = (value:string) => value.replace(/[^a-zA-Z0-9@!]/g, '').slice(0, 30);
