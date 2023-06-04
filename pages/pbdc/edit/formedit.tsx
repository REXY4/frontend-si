import React, { useState } from "react";
import { BasicInput } from "@/components/inputs";
import { Container, Box, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from '@mui/material/CircularProgress';
import { ModalBasic } from "@/components/modals";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Loading } from "@/components/Loading";
import { ListOrder } from "@/components/list";
import { CollapsePrimary } from "@/components/colapse";
import { DateFormattedPrimary } from "@/src/utils/DateTime";
import { FormDetailItemPbdc } from '../../../src/domain/entity/pbdc-entity';
import { withAuth } from "@/src/helpers/PrivateRoute";
import PbdcEditViewModel from "./pbdc-edit-view-model";

const FormEditPage = () => {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
    const {
    pluValidation,
    handleRoute,
    formEditDetailItem,
    onChangeEditDetailItem,
    onEditDetailItemPbdc,
    disableBtnEditDetailItem
} = PbdcEditViewModel();

    return (
      <Container>
        <Box marginBottom={3}>
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
        <Box marginBottom={4}>
          <Box marginBottom={2}>
            <BasicInput
              label="No Urut"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="nour"
              value={formEditDetailItem.nour}
              defaultValue={undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEditDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
              disabled
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              label="PLU"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="plu"
              value={pluValidation?.plu}
              defaultValue={undefined}
              onChange={undefined}
              error={false}
              placeholder=""
              errorMessage=""
              disabled
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              label="Deskripsi"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="plu"
              value={formEditDetailItem.desc}
              defaultValue={undefined}
              onChange={undefined}
              error={false}
              placeholder=""
              errorMessage=""
              disabled
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              label="Eq"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="eq"
              value={`${pluValidation?.konv}/${formEditDetailItem.eq}`}
              defaultValue={undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEditDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
              disabled
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              label="Order"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="order"
              value={String(formEditDetailItem.order)}
              defaultValue={undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeEditDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
              disabled={false}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRoute("/pbdc/edit")}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
            back
          </Button>
          <Button
            disabled={disableBtnEditDetailItem}
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
            {/* {loadingSave ? <CircularProgress color="success" /> : "Simpan"} */}
            Save
          </Button>
        </Box>
        <ModalBasic open={openModal} onClose={undefined}>
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
                Silahkan klik (Continue) untuk Save data !
              </span>
            </h1>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenModal(false)}
              >
                back
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                    onEditDetailItemPbdc();
                    setLoadingSave(true);
                    setOpenModal(false);
                  }}
              >
                Ya
              </Button>
            </Box>
          </Box>
        </ModalBasic>
        <Loading isLoading={loadingSave} />
      </Container>
    );
};

export default withAuth(FormEditPage);
