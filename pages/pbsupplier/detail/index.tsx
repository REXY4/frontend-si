import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";

import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Chip, Container,
 Divider, ThemeProvider,
} from "@mui/material";

import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { ListAddsPbdc, ListOrder } from "@/components/list";
import { colorBasic } from "@/styles/color";
import { BasicInput } from "@/components/inputs";
import { onlyValidationNumber } from "@/src/helpers/validation";
import ModalScanner from "@/components/scanners/ModalScanner";
import styles from "../../../styles/pages/pbdc.module.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ModalAlertInfo, ModalAlertSave, ModalAlertSuccess } from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Router } from "next/router";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PbSupEditViewModel from "./pbsup-detail-view-model";
import { Loading } from "@/components/Loading";

const DetailPbSupp = () => {
  const {
    dataPb,
    overview,
    handelVerify,
    openVerify,
    alerts,
    statusAlert,
    handleBack,
    setOpenVerify,
    isLoading,
    handleCloseAlertSuccess
  } = PbSupEditViewModel();

  const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1} display="flex" justifyContent="start">
            <p className="title-content">Detail  PB Supplier</p>
            {dataPb !== undefined && dataPb.status === "Draft" && (
            <Chip
              label={dataPb?.status}
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
            {dataPb !== undefined && dataPb.status !== "Draft" && (
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
                value={String(dataPb && dataPb.nopb)}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Tipe"
                value={String(dataPb && dataPb.tipe === "1" ? "1-REGULER" : "-")}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={`${dataPb && dataPb?.tgl !== "" ? DateFormattedPrimary(dataPb.tgl) : undefined}`}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Nilai"
                value={dataPb && String(dataPb?.nilai).toLocaleString()}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
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
              {overview && overview.map((item:any) => {
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
            justifyContent={dataPb?.status === "Draft" ? "space-between" : "center"}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBack()}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
            {dataPb?.status === "Draft"
            && (
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenVerify(true)}
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
          <ModalAlertInfo
            open={openVerify}
            onClose={undefined}
            messageAlert="Silahkan klick Lanjut untuk Verifikasi No Pb!"
            onClickNext={() => handelVerify()}
            onClickCancel={() => setOpenVerify(false)}
          />
          <ModalAlertSuccess
            open={alerts.isOpen}
            onClose={undefined}
            onClickOk={handleCloseAlertSuccess}
            messageAlert={String(alerts.message)}
          />
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default DetailPbSupp;
