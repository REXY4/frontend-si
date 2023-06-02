/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { CardContainer } from "@/components/cards";
import { BasicInput, SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Container, Divider, ThemeProvider,
} from "@mui/material";
import { Loading } from "@/components/Loading";
import styles from "../../../styles/pages/pbdc.module.css";
import ModalScanner from "@/components/scanners/ModalScanner";
import CircularProgress from '@mui/material/CircularProgress';
import {
 ListAddPbSupplier, ListAddsPbdc, ListOrder, ListOverViewPbdc
} from "@/components/list";
import {
 ModalAlertError, ModalAlertInfo, ModalAlertSave, ModalAlertSuccess, ModalBasic
} from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { validationJustNumber } from "@/src/helpers/validation";
import { DatePrimary } from "@/src/utils/DateTime";

import { colorBasic, colorOpacity } from "@/styles/color";
import PbSupplierEditModel from "./pbsupplier-edit-model";

const EditPbSupplier = () => {
  const {
  alerts,
  dataPb,
  disableBtnValidasiPlu,
  isLoading,
  handleBack,
  handleDetected,
  setPlu,
  nopb,
  handlePluValidation,
  handleNext,
  overview,
  handleDeleteItem,
  handleSaveData
} = PbSupplierEditModel();
const vh = (547 / window.innerHeight) * 100;
const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
const [openModalSave, setOpenModalSave] = useState<boolean>(false);

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <p className="title-content">Edit PB Supplier</p>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value={dataPb && dataPb?.nopb}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              {/* <ListOrder
                label="Dc"
                value={dcSelected}
                setValue={setSelectDc}
                selectInput
                selectData={dataDc}
              /> */}
              <ListOrder
                label="Tipe"
                value={dataPb?.tipe === "1" ? "1-REGULER" : ""}
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={DatePrimary(String(dataPb?.tgl))}
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
            </Box>
          </Box>
          <Divider />
          {nopb === ''
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
                value={undefined}
                defaultValue={undefined}
                onChange={(
                  e:React.ChangeEvent<HTMLInputElement>
                ) => setPlu(e.target.value)}
                error={false}
                placeholder=""
                errorMessage=""
              />
            </Box>
            <button
              id={disableBtnValidasiPlu ? styles["button-non-background-disabled"] : styles["button-non-backround"]}
              disabled={disableBtnValidasiPlu}
              onClick={() => handlePluValidation()}
            >
              Validasi
            </button>
          </Box>
          )}
          <Box marginTop={4} marginBottom={5}>
            {overview !== undefined && overview[0] !== undefined
            && (
            <CardContainer
              title="List Item"
              height={`${vh}vh`}
              customStyle={undefined}
              customStyleContent={undefined}
              backgroundColorHeader={colorOpacity.error}
              colorTitle={colorBasic?.white}
              total={String(overview && overview?.length)}
            >
              {overview.map((item:any) => {
              return(
                <Box>
                  <ListAddPbSupplier
                    plu={item.plu}
                    qty={item.qty}
                    desc={item.desc}
                    fr={item.fr}
                    onDelete={() => handleDeleteItem(item.plu)}
                    onUpdate={undefined}
                    onView={undefined}
                    sideButton
                  />
                </Box>
              );
            })}
            </CardContainer>
        )}
          </Box>

          <Box marginTop={5} display="flex" justifyContent={nopb !== "" ? "center" : "space-between"} marginBottom={3}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
            {nopb === ""
            && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                  setOpenModalSave(true);
              }}
            >
              <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
              Save
            </Button>
          )}
          </Box>
          <ModalAlertInfo
            open={alerts?.isOpen}
            onClose={undefined}
            messageAlert={String(alerts?.message)}
            onClickNext={() => handleNext("/pbsupplier/edit/form")}
            onClickCancel={() => alerts.setAlert(false, "")}
          />
          <ModalAlertInfo
            open={openModalSave}
            onClose={undefined}
            messageAlert="Silahkan Klick Tombol Yes untuk Menyimpan Data!..."
            onClickNext={() => {
              handleSaveData();
              setOpenModalSave(false);
            }}
            onClickCancel={() => setOpenModalSave(false)}
          />
          {alerts.statusData === 0
          && (
          <ModalAlertSuccess
            open={alerts.isOpen}
            onClose={undefined}
            onClickOk={() => alerts.setAlert(false, '')}
            messageAlert={String(alerts.message)}
          />
          )}
          {alerts.statusData === 2 && (
          <ModalAlertError
            open={alerts.isOpen}
            onClose={undefined}
            onClickOk={() => alerts.setAlert(false, "")}
            messageAlert={String(alerts.message)}
          />
        )}
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default EditPbSupplier;
