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
import { ListAddsPbdc, ListOverViewPbdc } from "@/components/list";
import {
 ModalAlertError, ModalAlertInfo, ModalAlertSave, ModalBasic
} from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import { validationJustNumber } from "@/src/helpers/validation";
import { DatePrimary } from "@/src/utils/DateTime";
import { colorBasic } from "@/styles/color";

interface PropsList {
    label : string,
    value : string,
    setValue :any
}

const ListOrder = ({ label, value, setValue }:PropsList) => {
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
        {label === "Dc" ? <SelectInputNative value={value} setValue={setValue} data={dc && dc} detail={false} /> : <p>{value}</p>}
      </div>
    );
};

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
  setPlu,
  disableBtnAddPlu,
  onPostPluValidation,
  handleRoute,
  detailItemPbdc,
  deleteItemPbdc,
  onGetDetailItemPbdc,
  onPostSaveData,
  handleNext,
  setOpenModalSave,
  openModalSave
} = PbdcAddViewModel();

const vh = (547 / window.innerHeight) * 100;

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <p className="title-content">Tambah  PBDC</p>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value="XXXXXXXX"
                setValue={undefined}
              />
              <ListOrder label="Dc" value={formDc} setValue={setFormDc} />
              <ListOrder
                label="Tipe"
                value="1-Reguler"
                setValue={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={DatePrimary(String(new Date()))}
                setValue={undefined}
              />
              <ListOrder
                label="Nilai"
                value="0"
                setValue={undefined}
              />
              <ListOrder
                label="Vol"
                value="0"
                setValue={undefined}
              />
              <ListOrder
                label="Jumlah Item"
                value={String(parseInt(detailItemPbdc.length))}
                setValue={undefined}
              />
            </Box>
          </Box>
          <Divider />
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
          <Box marginTop={4} marginBottom={5}>
            {detailItemPbdc !== undefined && detailItemPbdc[0] !== undefined
            && (
            <CardContainer
              title="List Item"
              height={`${vh}vh`}
              customStyle={{
                overflow: "scroll"
              }}
              customStyleContent={undefined}
              backgroundColorHeader={colorBasic?.error}
              colorTitle={colorBasic?.white}
            >
              {detailItemPbdc.map((item:any) => {
              return(
                <Box>
                  <ListAddsPbdc
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
          <Box marginTop={5} display="flex" justifyContent="space-between" marginBottom={3}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleBack()}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenModalSave(true)}
            >
              <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
              Save
            </Button>
          </Box>
          <ModalAlertError
            open={!statusPlu || valuePluSame ? alerts?.open : false}
            onClose={undefined}
            onClickOk={() => setAlert(false, "")}
            messageAlert={String(alerts?.message)}
          />
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
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default AddPbdc;
