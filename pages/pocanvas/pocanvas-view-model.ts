import React from "react";
import { useRouter } from "next/router";

const PoCanvasViewModel = () => {
    const poCanvas:any = [];
    let router = useRouter();
    const handelAddNewData = () => {
        return router.push("/pocanvas/add");
    };
    return{
        poCanvas,
        handelAddNewData,
    };
};

export default PoCanvasViewModel;
