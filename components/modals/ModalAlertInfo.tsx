import ModalBasic from "./ModalBasic";
import styles from "../../styles/pages/pbdc.module.css";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface Props {
    open : boolean
    onClose : void
    messageAlert : string
    onClickNext : void | any
    onClickCancel : void | any
}

const ModalAlertInfo = ({
 open, onClose, messageAlert, onClickNext, onClickCancel
}:Props) => {
    return (
      <ModalBasic open={open} onClose={onClose}>
        <Box>
          <h1 style={{
              color: "#009688",
              textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
          >
            <ErrorOutlineIcon color="success" />
            {' '}
            <span style={{ position: "relative", top: "2px" }}>
              {messageAlert}
            </span>
          </h1>
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              onClick={onClickCancel}
            >
              batal
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={onClickNext}
            >
              Lanjut
            </Button>
          </Box>
        </Box>
      </ModalBasic>
    );
};

export default ModalAlertInfo;
