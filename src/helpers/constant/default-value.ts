/* eslint-disable import/named */
import {
    ResponseEntity, ResponseEntityListValidation, ResponseStatusEntity,
} from "@/src/domain/entity/response-entity";

const EmptyResponseStatus: ResponseStatusEntity = {
    isError: false,
    code: 0,
    message: "",
};

const EmptyResponse: any = {
    validation: [],
    status: EmptyResponseStatus,
    data: undefined,
};

export const DefaultValue = {
    EmptyResponse,
    EmptyResponseStatus,
};
