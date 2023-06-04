import React from "react";
import { BasicInput } from "@/components/inputs";
import {
 Container, Box, Button, Divider
} from "@mui/material";
import styleButton from "../../../styles/pages/pbdc.module.css";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from '@mui/material/CircularProgress';
import { ModalAlertError, ModalAlertSave, ModalBasic } from "@/components/modals";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Loading } from "@/components/Loading";
import { CollapsePrimary } from "@/components/colapse";
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { ListOrder } from "@/components/list";
import { withAuth } from "@/src/helpers/PrivateRoute";
import PbSupplierAddModel from "./pbsupplier-add-model";

const FormPageSupplier = () => {
  const {
    pluData,
    alerts,
    onChangeForm,
    disableBtnValidasiOrder,
    handleValidationOrder,
    isLoading,
    openModalSave,
    setOpenModalSave,
    handleAddDraftDetailItem,
  } = PbSupplierAddModel();

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
              label="Nilai"
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
              value={String(pluData?.plu)}
              defaultValue={undefined}
              onChange={undefined}
              // onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
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
              onChange={undefined}
              value={`${pluData?.desc}`}
              defaultValue={undefined}
                        //   onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled
              label="Conv"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="Conv"
              defaultValue={undefined}
              //  onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
              value={`${pluData?.conv}/${pluData?.fmisis}`}
              onChange={undefined}
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled={false}
              label="Qty"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="qty"
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeForm(e)}
              error={false}
              placeholder="Masukan qty"
              errorMessage=""
              value={undefined}
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              disabled={false}
              label="Fr"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="fr"
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeForm(e)}
              error={false}
              placeholder="Masukan Fr"
              errorMessage=""
              value={undefined}
            />
          </Box>

        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            // onClick={() => handleBackForm()}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
            Back
          </Button>
          <Button
            // disabled={disableButtonDetailItem}
            variant="outlined"
            color="primary"
            onClick={() => setOpenModalSave(true)}
          >
            <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
            Save
          </Button>
        </Box>
        {alerts.statusData === 2 && (
        <ModalAlertError
          open={alerts.isOpen}
          onClose={undefined}
          onClickOk={() => alerts.setAlert(false, "")}
          messageAlert={String(alerts.message)}
        />
        )}
        <ModalAlertSave
          open={openModalSave}
          onClose={undefined}
          messageAlert="Silahkan klik Button Yes untuk menyimpan Data!"
          onClickNext={handleAddDraftDetailItem}
          onClickCancel={() => setOpenModalSave(false)}
        />
        <Loading isLoading={isLoading} />
      </Container>
    );
};

export default withAuth(FormPageSupplier);
