/* eslint-disable max-len */
import React, { useState } from "react";
import { CardContainer } from "@/components/cards";
import { BasicInput, SelectInputNative } from "@/components/inputs";
import { themeBasic } from "@/styles/theme";
import {
 Box, Button, Container, Divider, ThemeProvider,
} from "@mui/material";
import { Loading } from "@/components/Loading";
import styles from "../../../styles/pages/pbdc.module.css";
import ModalScanner from "@/components/scanners/ModalScanner";
import {
 ListAddPbSupplier, ListAddsPbdc, ListOrder, ListOverViewPbdc
} from "@/components/list";
import {
 ModalAlertError, ModalAlertInfo, ModalAlertSave, ModalAlertSuccess,
} from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import PbSupplierAddModel from "./pbsupplier-add-model";
import { colorBasic, colorOpacity } from "@/styles/color";

const AddPbdc = () => {
  const {
  alerts,
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
} = PbSupplierAddModel();
const vh = (547 / window.innerHeight) * 100;
const [openModalInfo, setOpenModalInfo] = useState<boolean>(false);
const [openModalSave, setOpenModalSave] = useState<boolean>(false);

    return(
      <ThemeProvider theme={themeBasic}>
        <Container>
          <Box marginBottom={1}>
            <p className="title-content">Tambah PB Supplier</p>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="center" color="#151515" marginTop={2}>
            <Box>
              <ListOrder
                label="Nomor Order"
                value={nopb === '' ? 'XXXXXX' : nopb}
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
                value="1-Reguler"
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Tanggal"
                value={DateFormattedPrimary(String(new Date()))}
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
                    sideButton={nopb === ""}
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
          {alerts.statusData === 2
          && (
          <ModalAlertInfo
            open={alerts?.isOpen}
            onClose={undefined}
            messageAlert={String(alerts?.message)}
            onClickNext={() => handleNext("/pbsupplier/add/form")}
            onClickCancel={() => alerts.setAlert(false, "")}
          />
          )}
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
          <ModalAlertError
            open={alerts.isOpen}
            onClose={undefined}
            onClickOk={alerts.setAlert(false, "")}
            messageAlert={String(alerts.message)}
          />
          <Loading isLoading={isLoading} />
        </Container>
      </ThemeProvider>
    );
};

export default AddPbdc;
