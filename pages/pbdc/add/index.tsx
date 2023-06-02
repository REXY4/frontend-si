import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";
import { BasicInput, SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
  Alert,
 Box, Button, Container, Divider, ThemeProvider, Typography
} from "@mui/material";
import PbdcAddViewModel from "./pbdc-add-view-model";
import { Loading } from "@/components/Loading";
import styles from "../../../styles/pages/pbdc.module.css";
// import { ModalBasic } from "@/components/modals";
import ModalScanner from "@/components/scanners/ModalScanner";
import { ListAddsPbdc, ListOrder, ListOverViewPbdc } from "@/components/list";
import {
 ModalAlertError, ModalAlertInfo, ModalAlertSave, ModalAlertSuccess, ModalBasic
} from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import { validationJustNumber } from "@/src/helpers/validation";
import { DatePrimary } from "@/src/utils/DateTime";
import { colorBasic } from "@/styles/color";
import { TitlePrimary } from "@/styles/text/title";
import { withAuth } from "@/src/helpers/PrivateRoute";

interface PropsList {
    label : string,
    value : string,
    setValue :any
}

const AddPbdc = () => {
  const {
  setAlert,
  alerts,
  statusPlu,
  isLoading,
  handleBack,
  valuePluSame,
  handleDetected,
  setFormDc,
  plu,
  formDc,
  dataDc,
  setPlu,
  disableBtnAddPlu,
  onPostPluValidation,
  handleRoute,
  dataSaveOnly,
  detailItemPbdc,
  deleteItemPbdc,
  onGetDetailItemPbdc,
  onPostSaveData,
  handleNext,
  setOpenModalSave,
  openModalSave,
  statusSavePbdc,
  totalItem,
  handleCloseModalSaveSuccess
} = PbdcAddViewModel();
console.log("daa in save");

const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <TitlePrimary>Tambah  PBDC</TitlePrimary>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value={!dataSaveOnly ? "XXXXXXX" : dataSaveOnly?.noPb}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Dc"
                value={formDc}
                setValue={setFormDc}
                selectInput={!dataSaveOnly}
                selectData={dataDc}
              />
              <ListOrder
                label="Tipe"
                value="1-Reguler"
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={DatePrimary(String(new Date()))}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Nilai"
                value="0"
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Vol"
                value="0"
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />

            </Box>
          </Box>
          <Divider />
          {!dataSaveOnly
          && (
          <Box marginTop={2} display="flex" justifyContent="flex-end">
            <Box marginRight={3}>
              <BasicInput
                disabled={false}
                label="PLU"
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
            <button
              id={disableBtnAddPlu ? styles["button-non-background-disabled"] : styles["button-non-backround"]}
              disabled={disableBtnAddPlu}
              onClick={() => onPostPluValidation(plu, formDc)}
            >
              Validasi
            </button>
          </Box>
)}
          <Box marginTop={4} marginBottom={5}>
            {detailItemPbdc !== undefined && detailItemPbdc[0] !== undefined
            && (
            <CardContainer
              total={String(detailItemPbdc && detailItemPbdc.length)}
              title="List Item"
              height={`${vh}vh`}
              customStyle={undefined}
              customStyleContent={{
                overflow: "scroll"
              }}
              backgroundColorHeader={colorBasic?.error}
              colorTitle={colorBasic?.white}
            >
              {detailItemPbdc.map((item:any) => {
              return(
                <Box>
                  <ListAddsPbdc
                    sideButton={!dataSaveOnly}
                    plu={item.plu}
                    eq={item.eq}
                    desc={item.desc}
                    order={item.order}
                    onDelete={() => deleteItemPbdc(String(item.plu))}
                    onUpdate={() => onGetDetailItemPbdc(item)}
                    onView={undefined}
                  />
                </Box>
              );
            })}
            </CardContainer>
        )}
          </Box>
          <Box
            marginTop={5}
            display="flex"
            justifyContent={!dataSaveOnly ? "space-between" : "center"}
            marginBottom={3}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBack()}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
            {!dataSaveOnly
            && (
            <Button
              disabled={parseInt(totalItem) === 0}
              variant="outlined"
              color="primary"
              onClick={() => setOpenModalSave(true)}
            >
              <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
              Save
            </Button>
)}
          </Box>
          {!statusSavePbdc
          && (
          <ModalAlertError
            open={!statusPlu || valuePluSame ? alerts?.open : false}
            onClose={undefined}
            onClickOk={() => setAlert(false, "")}
            messageAlert={String(alerts?.message)}
          />
          )}
          <ModalAlertInfo
            open={statusPlu && !valuePluSame ? alerts?.open : false}
            onClose={undefined}
            messageAlert={String(alerts?.message)}
            onClickNext={() => handleNext("/pbdc/add/form")}
            onClickCancel={() => setAlert(false, "")}
          />
          <ModalAlertSave
            open={openModalSave}
            onClose={undefined}
            messageAlert="Silahkan klik tombol (Continue) untuk Save data!"
            onClickNext={() => onPostSaveData()}
            onClickCancel={() => setOpenModalSave(false)}
          />
          {statusSavePbdc
          && (
          <ModalAlertSuccess
            open={alerts?.open}
            onClose={undefined}
            onClickOk={() => handleCloseModalSaveSuccess()}
            messageAlert={String(alerts?.message)}
          />
        )}
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default withAuth(AddPbdc);
