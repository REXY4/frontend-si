/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import {
 Box, Chip, Divider
} from "@mui/material";
import styles from "@/styles/components/list/list.module.css";
import { ButtonList } from "../buttons";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface Props {
    onView:void | any
    title : string
    type : string
    dc : string
    nilai : string
    tanggal : string,
    status : string | undefined
    onUpdate : void | any
}

const ListPrimary = ({
  onView,
 title, type, dc, nilai, tanggal, status, onUpdate
}:Props) => {
return (
  <>
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box>
        <Box style={{ display: "flex" }}>
          <h3
            className={`${styles.title} 
          ${styles.buttonTitle}`}
            onClick={onView}
            style={{
            display: "flex"
          }}
          >
            No Pb :
            {' '}
            {title}
            {' '}
          </h3>
          <Box>
            {status !== undefined && status === "Draft" && (
              <Chip
                label={status}
                color="error"
                sx={{
                marginLeft: "5px",
                position: "relative",
                bottom: "5px",
                fontSize: "12px",
                height: "12px"
            }}
              />
              )}
            {status !== undefined && status !== "Draft" && (
            <Box style={{
                  position: "relative",
                  display: "flex",
                  bottom: "5px"
                }}
            >
              <CheckCircleOutlineOutlinedIcon
                color="success"
                style={{
                              width: "20px",
                              marginLeft: "5px"
                            }}
              />
              {' '}
              <p style={{
              fontSize: "12px",
              color: "#009688",
              position: "relative",
                top: "4px",
              marginLeft: "3px"
              }}
              >
                Verify
              </p>
            </Box>
              )}
          </Box>
        </Box>
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
        onView={onView}
        color={undefined}
        onDelete={undefined}
        onUpdate={onUpdate}
      />
    </Box>
    <Divider />
  </>
    );
};
export default ListPrimary;
