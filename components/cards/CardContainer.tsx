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
    total : string
}

const CardContainer = ({
children, height, customStyle,
customStyleContent, title,
backgroundColorHeader, colorTitle, total
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
    }}
    >
      <h1
        style={{ color: colorTitle }}
      >
        {title}
        {' '}
        (
        {total === undefined ? 0 : total}
        )
      </h1>
    </CardContent>
    )}
    <CardContent sx={{
      overflow: "scroll",
      maxHeight: height
    }}
    >
      {children}
    </CardContent>
  </Card>
);

export default CardContainer;
