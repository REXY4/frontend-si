/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import {
 Box, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";

interface Props {
    onClickMain:any
    title : string
    type : string
    dc : string
    nilai : string
    tanggal : string
}

const ListPrimary = ({
  onClickMain,
 title, type, dc, nilai, tanggal
}:Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const d = new Date(tanggal);
    const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    const dateNow = `${date}/${month}/${d.getFullYear()}`;

return (
  <>
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box>

        <h3
          className={`${styles.title} 
          ${styles.buttonTitle}`}
          onClick={onClickMain}
        >
          No Pb :
          {' '}
          {title}
        </h3>
        <p className={styles.paragraf}>
          Tipe :
          {' '}
          {type}
          {' '}
          | DC :
          {' '}
          {dc}
        </p>
        <p className={styles.paragraf} style={{ marginTop: "5px" }}>
          Tanggal :
          {' '}
          {dateNow}
        </p>
        <p className={styles.paragraf} style={{ marginTop: "5px" }}>
          Nilai :
          {' '}
          {parseInt(nilai).toLocaleString()}
        </p>
      </Box>
      <ButtonList
        onView={onClickMain}
        color={undefined}
        onDelete={undefined}
        onUpdate={undefined}
      />
    </Box>
    <Divider />
  </>
    );
};
export default ListPrimary;
