import { Avatar, Box, CircularProgress } from "@mui/material";
import React from "react";

const CircularProgressWithContent = () => (
  <Box sx={{ position: "relative", display: "inline-flex" }}>
    <CircularProgress
      color="secondary"
      style={{ width: 80, height: 80 }}
    />
    <Box
      sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
    >
      <Avatar
        src="/superindo.jpg"
        style={{ width: 60, height: 60 }}
      />
    </Box>
  </Box>
    );

export { CircularProgressWithContent };
