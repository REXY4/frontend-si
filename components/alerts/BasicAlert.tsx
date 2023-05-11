import React, { FC } from "react";
import Alert, { AlertColor } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface Props {
    severity: AlertColor;
    message: string;
    isOpen: boolean;
    onClose: any;
}

const BasicAlerts: FC<Props> = ({
 severity = "warning", message, isOpen, onClose
}) => (
  <Box
    flexDirection="row"
    sx={{
                display: "hidden",
            }}
    position="absolute"
    zIndex={10}
    top={0}
    marginTop={5}
  >
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity} onClose={() => console.log("test")}>
        {message}
      </Alert>
    </Stack>
  </Box>
    );
export default BasicAlerts;
