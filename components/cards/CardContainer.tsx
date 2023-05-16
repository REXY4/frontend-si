import React, { ReactNode } from "react";
import { Card, CardContent } from "@mui/material";

interface Props {
    children : ReactNode,
    height : string
    customStyle : any
    customStyleContent : any
}

const CardContainer = ({
 children, height, customStyle, customStyleContent
}:Props) => (
  <Card sx={{
    height: `${height}`,
    ...customStyle
  }}
  >
    <CardContent sx={{
      ...customStyleContent
    }}
    >
      {children}
    </CardContent>
  </Card>
);

export default CardContainer;
