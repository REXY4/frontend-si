import ModalBasic from "./ModalBasic";
import styles from "../../styles/pages/pbdc.module.css";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, colors } from "@mui/material";
import { MouseEventHandler } from "react";
import { colorBasic } from "@/styles/color";

interface Props {
    open : boolean
    onClose : void
    onClickOk : MouseEventHandler<HTMLSpanElement> | undefined
    messageAlert : string
}

const ModalAlertSuccess = ({
 open, onClose, onClickOk, messageAlert
}:Props) => {
    return (
      <ModalBasic open={open} onClose={onClose}>
        <Box>
          <h1 style={{
              color: colorBasic.success,
             textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
          >
            <ErrorOutlineIcon
              color="success"
              style={{
                width: "20px"
            }}
            />
            {' '}
            <span style={{ position: "relative", top: "2px" }}>
              {messageAlert}
            </span>
          </h1>
          <Box display="flex" justifyContent="center">
            <span
              className={styles["button-alert-non-background"]}
              onClick={onClickOk}
            >
              OK
            </span>
          </Box>
        </Box>
      </ModalBasic>
    );
};

export default ModalAlertSuccess;
