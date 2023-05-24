import React, { useState } from "react";
import { BasicInput } from "@/components/inputs";
import { Container, Box, Button } from "@mui/material";
import PbdcAddViewModel from "./pbdc-add-view-model";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from '@mui/material/CircularProgress';
import { ModalBasic } from "@/components/modals";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Loading } from "@/components/Loading";

const FormPage = () => {
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
    const {
 pluValidation,
  handleRoute,
   disableButtonDetailItem,
    handleDetailItemPbdc,
    onChangeDetailItem,
} = PbdcAddViewModel();
    return (
      <Container>
        <Box marginBottom={2}>
          <h1 className="title-content">Form Pbdc</h1>
        </Box>
        <Box marginBottom={4}>
          <Box marginBottom={2}>
            <BasicInput
              label="No Urut"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="nour"
              value={undefined}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
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
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
              label="Eq"
              startIcon={undefined}
              endIcon={undefined}
              type=""
              name="eq"
              value={undefined}
              defaultValue={undefined}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeDetailItem(e)}
              error={false}
              placeholder=""
              errorMessage=""
            />
          </Box>
          <Box marginBottom={2}>
            <BasicInput
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
            onClick={() => handleRoute("/pbdc/add")}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: "5px", width: "15px" }} />
            Kembali
          </Button>
          <Button
            disabled={disableButtonDetailItem}
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(true)}
          >
            <SaveIcon sx={{ marginRight: "5px", width: "15px" }} />
            {/* {loadingSave ? <CircularProgress color="success" /> : "Simpan"} */}
            Simpan
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
                Silahkan klik Ya untuk melanjutkan !
              </span>
            </h1>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenModal(false)}
              >
                batal
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                    handleDetailItemPbdc();
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

export default FormPage;
