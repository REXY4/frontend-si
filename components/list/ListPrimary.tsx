/* eslint-disable radix */
import React from "react";
import {
 Box, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";

interface Props {
    title : string
    type : string
    dc : string
    nilai : string
}

const ListPrimary = ({
 title, type, dc, nilai
}:Props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const time = "2019-11-11T00:00";
    const d = new Date(time);
    const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    const tanggal = `${date}/${month}/${d.getFullYear()}`;
return (
  <>
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box>
        <h3 className={`${styles.title} ${styles.buttonTitle}`}>
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
          {tanggal}
        </p>
        <p className={styles.paragraf} style={{ marginTop: "5px" }}>
          Nilai :
          {' '}
          {parseInt(nilai).toLocaleString()}
        </p>
      </Box>
      <ButtonList
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
