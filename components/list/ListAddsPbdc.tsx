/* eslint-disable radix */
import React from "react";
import {
 Box, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";

interface Props {
     plu : string,
     nour : string,
     eq : string,
     order : string,
     onDelete : any,
     onUpdate : any,
     onView : any,
}

const ListAddsPbdc = ({
 plu, eq, order, nour, onDelete, onUpdate, onView
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
        <p className={styles.paragraf}>
          No Urut :
          {' '}
          {nour}
          {' '}
          | Eq :
          {' '}
          {eq}
          {' '}
          | Order :
          {' '}
          {order}
        </p>

      </Box>
      <ButtonList
        onView={undefined}
        color={undefined}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </Box>
    <Divider sx={{ marginBottom: "5px" }} />
  </>
    );
};
export default ListAddsPbdc;
