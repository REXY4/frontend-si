/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";

import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Chip, Container, Divider, ThemeProvider,
} from "@mui/material";
import PbdcAddViewModel from "../add/pbdc-add-view-model";
import PbdcDetailViewModel from "./pbdc-detail-view-model";
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { ListAddsPbdc } from "@/components/list";
import { colorBasic } from "@/styles/color";
import { BasicInput } from "@/components/inputs";
import { onlyValidationNumber } from "@/src/helpers/validation";
import ModalScanner from "@/components/scanners/ModalScanner";
import styles from "../../../styles/pages/pbdc.module.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ModalAlertSave } from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Router } from "next/router";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface PropsList {
    label : string,
    value : string,
    setValue :any
    view : boolean
}

const ListOrder = ({
 label, value, setValue, view
}:PropsList) => {
  const { dc } = PbdcAddViewModel();
    return(
      <div style={{
                display: "flex",
                justifyContent: "space-between",
                width: "255px",
                marginBottom: "10px"
              }}
      >
        <p style={{ fontWeight: "bold", fontSize: "12px" }}>
          {label}
          {' '}
          :
        </p>
        <p>{value}</p>
      </div>
    );
};

const DetailPagePbdc = () => {
const {
dataPbdc,
dataDc,
overview,
 onPostVerifyPbdc,
 setPlu,
 handleDetected,
 totalItem,
 openModalVerify,
 setOpenModalVerify,
 plu,
 handleBack
} = PbdcDetailViewModel();

const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1} display="flex" justifyContent="start">
            <p className="title-content">Detail  PBDC</p>
            {dataPbdc !== undefined && dataPbdc.status === "Draft" && (
            <Chip
              label={dataPbdc?.status}
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
            {dataPbdc !== undefined && dataPbdc.status !== "Draft" && (
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
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value={dataPbdc && dataPbdc.nopb}
                setValue={undefined}
                view
              />
              {/* <ListOrder
                label="Dc"
                value={dataDc && `${dataDc?.fmkcab}-${dataDc?.store_name}`}
                setValue={undefined}
                view
              /> */}
              <ListOrder
                label="Tipe"
                value="1-Reguler"
                setValue={undefined}
                view
              />
              <ListOrder
                label="Tanggal"
                value={`${dataPbdc && dataPbdc?.tgl !== "" ? DateFormattedPrimary(dataPbdc.tgl) : undefined}`}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Nilai"
                value={String(dataPbdc && dataPbdc?.nilai).toLocaleString()}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Vol"
                value={dataPbdc && dataPbdc?.vol === undefined ? 0 : dataPbdc?.vol}
                setValue={undefined}
                view
              />

            </Box>
          </Box>
          <Divider />

          <Box marginTop={4} marginBottom={5}>
            {overview !== undefined && overview[0] !== undefined
            && (
            <CardContainer
              title="List Item"
              total={String(overview && overview.length)}
              height={`${300}px`}
              customStyle={{
                overflow: "scroll"
              }}
              customStyleContent={undefined}
              backgroundColorHeader={colorBasic.error}
              colorTitle={colorBasic?.white}
            >
              {overview && overview.filter((
                fil:any
) => fil.plu.toLowerCase().includes(plu.toLowerCase())).map((item:any) => {
              return(
                <Box>
                  <ListAddsPbdc
                    plu={item.plu}
                    eq={item.eq}
                    desc={item.desc}
                    order={item.order}
                    onDelete={undefined}
                    onUpdate={undefined}
                    // onDelete={() => deleteItemPbdc(String(item.plu))}
                    // onUpdate={() => onGetDetailItemPbdc(item)}
                    onView={undefined}
                    sideButton={false}
                  />
                </Box>
              );
            })}
            </CardContainer>
        )}
          </Box>
          <Box
            display="flex"
            justifyContent={dataPbdc?.status === "Draft" ? "space-between" : "center"}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBack()}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
            {dataPbdc?.status === "Draft"
            && (
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenModalVerify(true)}
            >
              <AssignmentTurnedInIcon style={{
                marginRight: "5px",
                width: "20px"
              }}
              />
              {' '}
              Verify
            </Button>
            )}
          </Box>
          <ModalAlertSave
            open={openModalVerify}
            onClose={undefined}
            messageAlert="Silahkan klik (Next) untuk Verifikasi data!"
            onClickNext={() => onPostVerifyPbdc()}
            onClickCancel={() => setOpenModalVerify(false)}
          />
          {/* <Loading isLoading={isLoading} /> */}
        </Container>
      </ThemeProvider>
    );
};

export default DetailPagePbdc;
