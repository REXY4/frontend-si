/* eslint-disable import/named */
import {
    ResponseEntity, ResponseEntityListValidation, ResponseStatusEntity,
} from "@/src/domain/entity/response-entity";

const EmptyResponseStatus: ResponseStatusEntity = {
    isError: false,
    code: 0,
    message: "",
};

const EmptyResponse: ResponseEntityListValidation = {
    validation: [],
    status: EmptyResponseStatus,
    data: [],
};

export const DefaultValue = {
    EmptyResponse,
    EmptyResponseStatus,
};
