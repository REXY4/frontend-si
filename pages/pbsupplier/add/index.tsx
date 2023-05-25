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
import { ListAddsPbdc, ListOrder, ListOverViewPbdc } from "@/components/list";
import {
 ModalAlertError, ModalAlertInfo, ModalAlertSave, ModalBasic
} from "@/components/modals";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { validationJustNumber } from "@/src/helpers/validation";
import { DatePrimary } from "@/src/utils/DateTime";
import PbSupplierAddModel from "./pbsupplier-add-model";

const AddPbdc = () => {
    const {
  dataDc,
  handleBack,
  setSelectDc,
  dcSelected,
  handleDetected,
  setPlu,
  disableBtnValidasiPlu
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
                value="XXXXXXXX"
                setValue={undefined}
                selectInput={false}
                selectData={undefined}
              />
              <ListOrder
                label="Dc"
                value={dcSelected}
                setValue={setSelectDc}
                selectInput
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
            //   onClick={() => }
            >
              Validasi
            </button>
          </Box>
          {/* <Box marginTop={4} marginBottom={5}>
            {detailItemPbdc !== undefined && detailItemPbdc[0] !== undefined
            && (
            <CardContainer
              title="List Item"
              height={`${vh}vh`}
              customStyle={undefined}
              customStyleContent={undefined}
              children={undefined}
              backgroundColorHeader=""
              colorTitle=""
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
          */}
          <Box marginTop={5} display="flex" justifyContent="space-between" marginBottom={3}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBack}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
              Back
            </Button>
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
          </Box>
          <ModalAlertInfo
            open={false}
            onClose={undefined}
            messageAlert=""
            onClickNext={undefined}
            onClickCancel={undefined}
          />
          <ModalAlertError
            open={false}
            onClose={undefined}
            onClickOk={undefined}
            messageAlert=""
          />
          <ModalAlertSave
            open={openModalSave}
            onClose={undefined}
            messageAlert="Silahkan Klik (Ya) untuk save data PB Supplier!"
            onClickNext={undefined}
            onClickCancel={() => setOpenModalSave(false)}
          />
          {/* <Loading isLoading={isLoading || loadingBar} /> */}
        </Container>
      </ThemeProvider>
    );
};

export default AddPbdc;
