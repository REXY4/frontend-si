import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

interface Props {
    children : ReactNode,
    height : string
    customStyle : any
    customStyleContent : any
    title : string
    backgroundColorHeader : string
    colorTitle : string
}

const CardContainer = ({
children, height, customStyle,
customStyleContent, title,
backgroundColorHeader, colorTitle
}:Props) => (
  <Card sx={{
    maxHeight: `${height}`,
    ...customStyle
  }}
  >
    {title !== undefined
    && (
    <CardContent style={{
      background: backgroundColorHeader,
      overflow: "scroll"
    }}
    >
      <h1
        style={{ color: colorTitle }}
      >
        {title}
      </h1>
    </CardContent>
    )}
    <CardContent sx={{
      ...customStyleContent
    }}
    >
      {children}
    </CardContent>
  </Card>
);

export default CardContainer;
