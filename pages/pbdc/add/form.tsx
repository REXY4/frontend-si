import React, { useState } from "react";
import { BasicInput } from "@/components/inputs";
import {
 Container, Box, Button, Divider
} from "@mui/material";
import PbdcAddViewModel from "./pbdc-add-view-model";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from '@mui/material/CircularProgress';
import { ModalAlertSave, ModalBasic } from "@/components/modals";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Loading } from "@/components/Loading";
import { CollapsePrimary } from "@/components/colapse";
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { ListOrder } from "@/components/list";
import { withAuth } from "@/src/helpers/PrivateRoute";

interface PropsList {
    label : string,
    value : string,
    setValue :any
}

const FormPage = () => {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [openModal, setOpenModalSave] = useState<boolean>(false);
  const {
 pluValidation,
 alerts,
  handleBackForm,
  disableButtonDetailItem,
  formDetailItem,
  handleSaveDetailItemPbdc,
  isLoading,
  onChangeDetailItem,
  setAlert
} = PbdcAddViewModel();

    return (
      <Container>
        {/* <Box marginBottom={1}>
          <h1 className="title-content">Form Pbdc</h1>
        </Box> */}
        <Divider />
        <Box>
          <CollapsePrimary title="NO ORDER : XXXXXXX">
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
              label="Dc"
              value="0970"
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
          </CollapsePrimary>
        </Box>
        <Box marginBottom={4} marginTop={3}>
          <Box marginBottom={2}>
            <BasicInput
              disabled
              label="PLU"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="order"
              value={formDetailItem?.plu}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled
              label="Deskripsi"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="order"
              value={`${formDetailItem?.desc}`}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled
              label="Eq"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="order"
              value={`${pluValidation?.konv}/${formDetailItem?.eq}`}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled={false}
              label="Order"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="order"
              value={undefined}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleBackForm()}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
            Back
          </Button>
          <Button
            disabled={disableButtonDetailItem}
            variant="outlined"
            color="primary"
            onClick={() => setAlert(true, "Silahkan klik tombol (continue) untuk menyimpan data!")}
          >
            <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
            Save
          </Button>
        </Box>
        <ModalAlertSave
          open={alerts?.open}
          onClose={() => undefined}
          messageAlert={String(alerts?.message)}
          onClickNext={() => handleSaveDetailItemPbdc()}
          onClickCancel={() => setAlert(false, "")}
        />
        <Loading isLoading={isLoading} />
      </Container>
    );
};

export default withAuth(FormPage);
