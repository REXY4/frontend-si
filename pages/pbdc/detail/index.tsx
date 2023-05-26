/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";

import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Container, Divider, ThemeProvider,
} from "@mui/material";
import PbdcAddViewModel from "../add/pbdc-add-view-model";
import PbdcDetailViewModel from "./pbdc-detail-view-model";
import { DatePrimary } from "@/src/utils/DateTime";
import { ListAddsPbdc } from "@/components/list";
import { colorBasic } from "@/styles/color";
import { BasicInput } from "@/components/inputs";
import { validationJustNumber } from "@/src/helpers/validation";
import ModalScanner from "@/components/scanners/ModalScanner";
import styles from "../../../styles/pages/pbdc.module.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { ModalAlertSave } from "@/components/modals";

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
 openModalVerify,
 setOpenModalVerify,
 plu
} = PbdcDetailViewModel();
const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1} display="flex" justifyContent="space-between">
            <p className="title-content">Detail  PBDC</p>
            <Button
              variant="contained"
              color="warning"
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
                value={DatePrimary(dataPbdc.tgl)}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Nilai"
                value={String(dataPbdc?.nilai).toLocaleString()}
                setValue={undefined}
                view
              />
              <ListOrder
                label="Vol"
                value={dataPbdc?.vol === undefined ? 0 : dataPbdc?.vol}
                setValue={undefined}
                view
              />
            </Box>
          </Box>
          <Divider />
          {/* <Box marginTop={3} display="flex" justifyContent="center">
            <Box marginRight={3}>
              <BasicInput
                disabled={false}
                label="SEARCH PLU"
                startIcon={undefined}
                endIcon={<ModalScanner onDetected={handleDetected} />}
                type=""
                name=""
                value={plu === "" ? "" : plu}
                defaultValue={undefined}
                onChange={(
                  e:React.ChangeEvent<HTMLInputElement>
                ) => setPlu(validationJustNumber(e.target.value))}
                error={false}
                placeholder=""
                errorMessage=""
              />
            </Box>
            {/* <button
               id={disableBtnAddPlu ? styles["button-non-background-disabled"] : styles["button-non-backround"]}
              disabled={disableBtnAddPlu}
              onClick={() => onPostPluValidation(plu, formDc)}>
              Validasi
            </button>
          </Box>
          */}
          <Box marginTop={4} marginBottom={5}>
            {overview !== undefined && overview[0] !== undefined
            && (
            <CardContainer
              title="List Item"
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
                  />
                </Box>
              );
            })}
            </CardContainer>
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
