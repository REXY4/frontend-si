import { Backdrop } from "@mui/material";
import React, { FC } from "react";
import { CircularProgressWithContent } from "./CircularProgressWithLabel";

type LoadingProps = {
    isLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ isLoading }) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: theme => theme.zIndex.drawer + 10000,
                background: "#00000080",
            }}
            open={isLoading}
        >
            <CircularProgressWithContent />
        </Backdrop>
    );
};

export { Loading };
