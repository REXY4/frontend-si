import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";
import { BasicInput, SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
  Alert,
 Box, Button, Container, Divider, ThemeProvider, Typography
} from "@mui/material";
import PbdcAddViewModel from "./pbdc-add-view-model";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import styles from "../../../styles/pages/pbdc.module.css";
// import { ModalBasic } from "@/components/modals";
import ModalScanner from "@/components/scanners/ModalScanner";
import CircularProgress from '@mui/material/CircularProgress';
import { ListAddsPbdc, ListOverViewPbdc } from "@/components/list";
import { ModalBasic } from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { validationJustNumber } from "@/src/helpers/validation";

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
        {label === "Dc" ? <SelectInputNative setValue={setValue} data={dc && dc} detail={false} /> : <p>{value}</p>}

      </div>
    );
};

const AddPbdc = () => {
  const [loadingNextButton, setLoadingNextButton] = useState<boolean>(false);
  const {
  checkRosso,
  isLoading,
  handleBack,
  handleDetected,
  setFormDc,
  plu,
  formDc,
  setPlu,
  setAlert,
  disableBtnAddPlu,
  isOpenAlert,
  messageAlert,
  onPostPluValidation,
  pluValidation,
  onPostSaveData,
  statusCheckPlu,
  handleRoute,
  detailItemPbdc,
  deleteItemPbdc,
  sameValuePlu,
  onGetDetailItemPbdc,
  setAlertSaveData,
  alertSaveData,
} = PbdcAddViewModel();
const vh = (547 / window.innerHeight) * 100;
 const d = new Date(Date.now());
 const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
 const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
 const dateNow = `${date}/${month}/${d.getFullYear()}`;
 const [openModalSave, setOpenModalSave] = useState<boolean>(false);

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <p className="title-content">Tambah  PBDC</p>
          </Box>
          <Divider />
          {/* {checkRosso && !checkRosso.statusRosso
          && (
          <Box marginTop={3}>
            <Alert severity="error">
              {checkRosso?.message}
            </Alert>
          </Box>
          )} */}
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value="XXXXXXXX"
                setValue={undefined}
              />
              <ListOrder label="Dc" value="130410" setValue={setFormDc} />
              <ListOrder
                label="Tipe"
                value="1-Reguler"
                setValue={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={dateNow}
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
            </Box>
          </Box>
          <Divider />
          <Box marginTop={2} display="flex" justifyContent="flex-end">
            <Box marginRight={3}>
              <BasicInput
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
              {/* {isLoadingBtnPlu ? <CircularProgress /> : "TAMBAH"} */}
              {/* <AddModeratorIcon sx={{ marginRight: "5px", width: "15px" }} /> */}
              Validasi
            </button>
          </Box>
          <Box marginTop={4} marginBottom={5}>
            {detailItemPbdc !== undefined && detailItemPbdc[0] !== undefined
            && (
            <CardContainer
              height={`${vh}vh`}
              customStyle={undefined}
              customStyleContent={undefined}
            >
              {detailItemPbdc.map((item:any) => {
              return(
                <Box>
                  <ListAddsPbdc
                    plu={item.plu}
                    nour={item.nour}
                    eq={item.eq}
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
              Kembali
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                if(formDc === "") {
                  setAlertSaveData(true);
                }else{
                  setOpenModalSave(true);
                }
              }}
            >
              <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
              Simpan
            </Button>
          </Box>
          <ModalBasic
            open={isOpenAlert}
            onClose={undefined}
          >
            {sameValuePlu
            && (
            <Box>
              <h1 style={{
              color: "#ec407a",
             textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
              >
                <ErrorOutlineIcon color="error" />
                {' '}
                <span style={{ position: "relative", top: "2px" }}>
                  {messageAlert}
                </span>
              </h1>
              <Box display="flex" justifyContent="center">
                <span
                  className={styles["button-alert-non-background"]}
                  onClick={() => setAlert(false, "")}
                >
                  OK
                </span>
              </Box>
            </Box>
            )}
            {!statusCheckPlu && !sameValuePlu
            && (
            <Box>
              <h1 style={{
              color: "#ec407a",
             textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
              >
                <ErrorOutlineIcon color="error" />
                {' '}
                <span style={{ position: "relative", top: "2px" }}>
                  {messageAlert}
                </span>
              </h1>
              <Box display="flex" justifyContent="center">
                <span
                  className={styles["button-alert-non-background"]}
                  onClick={() => setAlert(false, "")}
                >
                  OK
                </span>
              </Box>
            </Box>
            )}
            {statusCheckPlu && !sameValuePlu
             && (
             <Box>
               <h1 style={{
              color: "#009688",
              textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
               >
                 <ErrorOutlineIcon color="success" />
                 {' '}
                 <span style={{ position: "relative", top: "2px" }}>
                   {messageAlert}
                 </span>
               </h1>
               <Box display="flex" justifyContent="space-between">
                 <Button
                   variant="outlined"
                   color="error"
                   onClick={() => setAlert(false, "")}
                 >
                   batal
                 </Button>
                 <Button
                   variant="outlined"
                   color="success"
                   onClick={() => {
                    handleRoute("/pbdc/add/form");
                    setLoadingNextButton(true);
                  }}
                 >
                   {loadingNextButton ? <CircularProgress color="success" /> : "Lanjut" }
                 </Button>
               </Box>
             </Box>
)}
          </ModalBasic>
          <ModalBasic open={openModalSave} onClose={undefined}>
            <Box>
              <h1 style={{
              color: "#009688",
              textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
              >
                <ErrorOutlineIcon color="success" />
                {' '}
                <span style={{ position: "relative", top: "2px" }}>
                  Silahkan klik ya untuk menyimpan Data!
                </span>
              </h1>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenModalSave(false)}
                >
                  Tidak
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    onPostSaveData(formDc);
                  }}
                >
                  Ya
                </Button>
              </Box>
            </Box>
          </ModalBasic>
          <ModalBasic open={alertSaveData} onClose={undefined}>
            <Box>
              <h1 style={{
              color: "#ec407a",
             textAlign: "center",
              fontSize: "16px",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
              >
                <ErrorOutlineIcon color="error" />
                {' '}
                <span style={{ position: "relative", top: "2px" }}>
                  Silahkan pilih Dc Terlebih dahulu!
                </span>
              </h1>
              <Box display="flex" justifyContent="center">
                <span
                  className={styles["button-alert-non-background"]}
                  onClick={() => setAlertSaveData(false)}
                >
                  OK
                </span>
              </Box>
            </Box>
          </ModalBasic>
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default AddPbdc;
