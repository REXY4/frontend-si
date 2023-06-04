import React from "react";
import { BasicInput } from "@/components/inputs";
import { ListOrder } from "@/components/list";
import ModalScanner from "@/components/scanners/ModalScanner";
import { onlyValidationNumber } from "@/src/helpers/validation";
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { TitlePrimary } from "@/styles/text/title";
import {
 Box, Button, Container, Divider
} from "@mui/material";
import PoCanvasAddDataViewModel from "./pocanvas-add-view-model";
import pbdcStyles from "../../../styles/pages/pbdc.module.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SaveIcon from '@mui/icons-material/Save';

const PoCanvasAddData = () => {
    const {
    handleDetected,
    plu,
    setPlu,
    disableBtnAddPlu,
    } = PoCanvasAddDataViewModel();

    return(
      <Container>
        <Box
          flexDirection="row"
          marginBottom={1}
        >
          <TitlePrimary>Tambah Po Canvas</TitlePrimary>
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="center"
          color="#151515"
          marginTop={2}
        >
          <Box>
            <ListOrder
              label="No.UO"
              value="XXXXXXXXXXXX"
              setValue={undefined}
              selectInput={false}
              selectData={undefined}
            />
            <ListOrder
              label="Supplier"
              value="XXXXXXXXXXXX"
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
            <ListOrder
              label="Total"
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
              value={plu === "" ? "" : plu}
              defaultValue={undefined}
              onChange={(
                  e:React.ChangeEvent<HTMLInputElement>
                ) => setPlu(onlyValidationNumber(e.target.value))}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <button
            id={disableBtnAddPlu ? pbdcStyles["button-non-background-disabled"] : pbdcStyles["button-non-backround"]}
            disabled={disableBtnAddPlu}
            // onClick={() => onPostPluValidation(plu, formDc)}
          >
            Validasi
          </button>
        </Box>

        <Box marginTop={5} display="flex" justifyContent="space-between" marginBottom={3}>
          <Button
            variant="contained"
            color="error"
            // onClick={handleBack}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
            Back
          </Button>
          <Button
            variant="outlined"
            color="primary"
            // onClick={() => {
            //       setOpenModalSave(true);
            //   }}
          >
            <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
            Save
          </Button>
        </Box>

      </Container>
    );
};

export default PoCanvasAddData;
