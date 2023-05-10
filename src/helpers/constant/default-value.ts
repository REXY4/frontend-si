import {
    ResponseEntity,
    ResponseStatusEntity,
} from "@/src/domain/entity/response-entity";

const EmptyResponseStatus: ResponseStatusEntity = {
    isError: false,
    code: 0,
    message: "",
};

const EmptyResponse: ResponseEntity<any> = {
    validation: [],
    status: EmptyResponseStatus,
    data: undefined,
};

export const DefaultValue = {
    EmptyResponse,
    EmptyResponseStatus,
};
