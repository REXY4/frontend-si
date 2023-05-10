import {
    ResponseEntity,
    ResponseEntityList,
} from "@/src/domain/entity/response-entity";
import { ResponseStatus } from "./constant/response-status";

const mapResponse = (response: ResponseEntity<any>) => {
    return {
        ...response,
        status: {
            ...response?.status,
            isError: String(response?.status?.code).charAt(0) != "2",
        },
    };
};

const mapResponseList = (response: ResponseEntityList<any>) => {
    const r = {
        data: response?.data,
        validation: response?.validation,
        status: {
            ...response?.status,
            isError: String(response?.status?.code).charAt(0) != "2",
        },
    };

    return r;
};

const isResponseSuccess = (statusCode: number): boolean => {
    return (
        [ResponseStatus.Success, ResponseStatus.SuccessPosted].includes(
            statusCode
        ) ?? false
    );
};

export { mapResponse, mapResponseList, isResponseSuccess };
