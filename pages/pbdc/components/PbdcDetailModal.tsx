import React, { useEffect, useState } from "react";
import { LsiListItem } from "@/components/LsiListItem";
import { PbdcDetailEntity, PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    List,
    TextField,
    Typography,
} from "@mui/material";

import PdbcFormModal from "./PbdcFormModal";
import { Loading } from "@/components/Loading";

type ModalProps = {
    isLoading: boolean;
    isOpen: boolean;
    pbdc: any;
    onSave: (
        id: number,
        nopb: string,
        cab: string,
        tipe: string,
        dc: string,
        tgl: string,
        nilai: number,
        status: string,
        details: PbdcDetailEntity[]
    ) => void;
    onSaveDraftDetail: (plu: string, eq: number) => void;
    onDeleteDraftDetail: any;
    onClose: () => void;
};

 const PdbcDetailModal = ({
    isLoading,
    isOpen,
    pbdc,
    onSave,
    onSaveDraftDetail,
    onDeleteDraftDetail,
    onClose,
}:ModalProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [listDetails, setListDetails] = useState<PbdcDetailEntity[]>([]);
    const [nopb, setNopb] = useState<string>("");
    const [dc, setDc] = useState<string>("");
    const [tipe, setTipe] = useState<string>("");
    const [tgl, setTgl] = useState<string>("");

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSave = (
        id: number,
        nopb: string,
        cab: string,
        tipe: string,
        dc: string,
        tgl: string,
        nilai: number,
        status: string,
        details: PbdcDetailEntity[]
    ) => {
        onSave(id, nopb, cab, tipe, dc, tgl, nilai, status, details);
        handleCloseModal();
    };

    const handleSaveDraftDetail = (plu: string, eq: number) => {
        onSaveDraftDetail(plu, eq);
    };

    const handleDeleteDraftDetail = (id: number|undefined) => {
        onDeleteDraftDetail(id);
    };

    useEffect(() => {
        setListDetails(pbdc.details);
    }, [pbdc?.details]);

    return (
      <div>
        <Loading isLoading={isLoading} />
        <Dialog open={isOpen} fullWidth>
          <DialogTitle
            sx={{
                        paddingBottom: "0px",
                    }}
          >
            <Typography gutterBottom>
              Detail Penerimaan Barang DC
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                            height: "40%",
                        }}
            >
              <Grid
                xs={12}
                sx={{
                                paddingTop: "10px",
                            }}
              >
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="no-order"
                  label="Nomor Order"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pbdc?.nopb}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="dc"
                  label="DC"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pbdc?.dc}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="type"
                  label="Tipe"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pbdc?.tipe}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  id="order-date"
                  label="Tanggal"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={pbdc?.tgl}
                />
              </Grid>
              <Grid container>
                <Grid
                  xs={6}
                  sx={{
                                    paddingTop: "10px",
                                }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    List Barang
                  </Typography>
                </Grid>
                <Grid
                  xs={6}
                  sx={{
                                    paddingTop: "10px",
                                    display: "grid",
                                }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ alignItems: "end" }}
                    color="success"
                    onClick={handleOpenModal}
                  >
                    Tambah
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                            maxHeight: "60%",
                            height: "60%",
                        }}
            >
              <Grid
                xs={12}
                sx={{
                                paddingTop: "10px",
                            }}
              >
                <List
                  sx={{
                                    width: "100%",
                                    height: "400px",
                                    bgcolor: "background.paper",
                                    overflow: "scroll",
                                }}
                >
                  {listDetails?.map((value) => (
                    <>
                      <LsiListItem
                        key={value.id}
                        id={value.id ?? ""}
                        title={`PLU: ${value.plu} - ${value.description}`}
                        subtitle={`Conv: ${value.convertion} | Eq: ${value.eq} | Order: ${value.qty_order}`}
                        onDelete={() => handleDeleteDraftDetail(
                                                        value.id
                                                    )}
                      />
                      <Divider
                        variant="inset"
                        component="li"
                      />
                    </>
                                    ))}
                </List>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                            onClose();
                        }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                            handleSave(
                                Math.random() * 1000000,
                                nopb,
                                "cab",
                                tipe,
                                dc,
                                tgl,
                                0,
                                "STS",
                                listDetails
                            );
                            onClose();
                        }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <PdbcFormModal
          isLoading={isLoading}
          onClose={handleCloseModal}
          isOpen={openModal}
          onSaveDraftDetail={handleSaveDraftDetail}
          pbdcDetail={undefined}
        />
      </div>
    );
};

export default PdbcDetailModal;
