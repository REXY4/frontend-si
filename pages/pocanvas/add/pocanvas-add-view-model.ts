import { useEffect, useState } from "react";

const PoCanvasAddDataViewModel = () => {
    const [plu, setPlu] = useState<string>("");
        const [disableBtnAddPlu, setDisableBtnAddPlu] = useState<boolean>(true);

      const handleDetected = (result:any) => {
        setPlu(result);
    };

    // handle disable button plu
    useEffect(() => {
        if(plu === "") {
            setDisableBtnAddPlu(true);
        }else{
            setDisableBtnAddPlu(false);
        }
    }, [plu]);

    return{
        plu,
        setPlu,
        disableBtnAddPlu,
        handleDetected,
    };
};

export default PoCanvasAddDataViewModel;
