import React, { FC } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import styles from "@/styles/components/alerts/alert.module.css";

export enum SeverityType {
  warning = "warning",
  success = "success",
  info = "info",
  error = "error",
}

interface Props {
    severity: AlertColor;
    message: string | null;
    isOpen: boolean;
    onClose: any;
}

export const BasicAlerts: FC<Props> = ({
 severity = SeverityType.warning, message, isOpen, onClose
}) => (
  <Box
    className={styles["fade-down"]}
    flexDirection="row"
    sx={{
      display: isOpen ? "" : "none",
      maxWidth: "325px"
    }}
    position="absolute"
    zIndex={10}
    top={0}
    marginTop="100px"
  >
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Stack>
  </Box>
    );
