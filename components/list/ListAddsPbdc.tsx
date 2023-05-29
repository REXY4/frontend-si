/* eslint-disable radix */
import React from "react";
import {
 Box, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";

interface Props {
     plu : string,
     sideButton : boolean,
     eq : string,
     order : string,
     onDelete : any,
     onUpdate : any,
     onView : any,
     desc : string
}

const ListAddsPbdc = ({
 plu, eq, order, onDelete, onUpdate, onView, desc, sideButton
}:Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

return (
  <>
    <Box display="flex" justifyContent="space-between" marginBottom={1}>
      <Box>
        <h3 className={`${styles.title} ${styles.buttonTitle}`}>
          PLU :
          {' '}
          {plu}
        </h3>
        <p className={`${styles.paragraf}`}>
          {desc}
        </p>
        <p className={styles.paragraf}>
          Eq :
          {' '}
          {eq}
          {' '}
          | Order :
          {' '}
          {order}
        </p>

      </Box>
      {sideButton === true
      && (
      <ButtonList
        onView={undefined}
        color={undefined}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
)}
    </Box>
    <Divider sx={{ marginBottom: "5px" }} />
  </>
    );
};
export default ListAddsPbdc;
