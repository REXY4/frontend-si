/* eslint-disable radix */
import React from "react";
import {
 Box, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";

interface Props {
     plu : string,
     desc : string,
     conv : string,
     eq : string,
     order : string,
     vol : string
}

const ListOverViewPbdc = ({
 plu, desc, conv, eq, order, vol
}:Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

return (
  <>
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box>
        <h3 className={`${styles.title} ${styles.buttonTitle}`}>
          PLU :
          {' '}
          {plu}
        </h3>
        <p className={styles.paragraf}>
          Desc :
          {' '}
          {desc}
          {' '}
        </p>
        <p className={styles.paragraf} style={{ marginTop: "5px" }}>
          Conv :
          {' '}
          {conv}
          {' '}
          | Eq :
          {' '}
          {eq}
          {' '}
          | Order :
          {' '}
          {order}
        </p>
        <p className={styles.paragraf} style={{ marginTop: "5px" }}>
          Vol :
          {' '}
          {vol}
        </p>
      </Box>
      {/* <ButtonList
        color={undefined}
        onDelete={undefined}
        onUpdate={undefined}
      /> */}
    </Box>
    <Divider />
  </>
    );
};
export default ListOverViewPbdc;
