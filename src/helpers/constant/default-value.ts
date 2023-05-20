/* eslint-disable import/named */
import {
    ResponseEntity,
} from "@/src/domain/entity/response-entity";

const EmptyResponseStatus: any = {
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
