import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import styles from "@/styles/components/cards/box-card-button.module.css";

interface Props {
    icon : any
    title : string
    onClick : () =>void
}

const BoxCardButton = ({ icon, title, onClick }:Props) => (
  <Card className={styles.cardContent} onClick={onClick}>
    <CardContent>
      <Box display="flex" justifyContent="center" mb={1}>
        {icon}
      </Box>
      <p className={styles.subTitleCard}>{title}</p>
    </CardContent>
  </Card>
 );

 export default BoxCardButton;
