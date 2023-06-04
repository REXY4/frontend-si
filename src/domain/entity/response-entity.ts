// export interface ResponseEntity<T> {
//   validation: any[] | [];
//   status: ResponseStatusEntity;
//   data: T;
// }

export interface ResponseEntityListValidation {
  validation: [];
  status: ResponseStatusEntity;
  data: [];
}

export interface ResponseStatusEntity {
  isError: boolean | false;
  code: number;
  message: string;
}

export interface ResponseEntity<T> {
    returnType: string;
    returnMessage: string;
    returnData: T;
    returnObject: T;
}

export interface ResponseEntityList<T> {
    returnType: string;
    returnMessage: string;
    returnData: [T];
    returnObject: T;
}
