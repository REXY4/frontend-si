import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    ButtonGroup,
    Divider,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    List,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LsiListItem } from "@/components/LsiListItem";
import { LsiModal } from "@/components/LsiModal";
import PdbcDetailModal from "./components/PbdcDetailModal";
import PbdcViewModel from "./pbdc-view-model";
import { Loading } from "@/components/Loading";
import SearchIcon from "@mui/icons-material/Search";
import { PbdcEntity } from "@/src/domain/entity/pbdc-entity";
import { withAuth } from "@/src/helpers/PrivateRoute";

const Pbdc = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [pbdcObject, setPbdcObject] = useState<PbdcEntity>();
    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const {
        pbdcs,
        pbdcDraft,
        onLoad,
        onFilter,
        onSave,
        onSaveDraftDetail,
        onDeleteDraftDetail,
        isLoading,
        isOpenAlert,
        alertMessage,
        hideAlert,
    } = PbdcViewModel();

    useEffect(() => {
        onLoad("0119");
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCloseMessage = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenMessage(false);
    };

    const handleCreateNew = () => {
        // setPbdcObject({
        //     id: undefined,
        //     nopb: "XXXXXXXX",
        //     cab: "",
        //     dc: "",
        //     tipe: "1 - REGULAR",
        //     tgl: new Date().toLocaleDateString(),
        //     nilai: 0,
        //     status: "",
        //     details: []
        // });

        setOpenModal(true);
    };

    const handleSave = () => {
        onSave(
            pbdcDraft.id,
            pbdcDraft.nopb,
            pbdcDraft.cab,
            pbdcDraft.tipe,
            pbdcDraft.dc,
            pbdcDraft.tgl,
            pbdcDraft.nilai,
            pbdcDraft.status,
            pbdcDraft.details
        );
    };

    const handleSaveDraftDetail = (plu: string, eq: number) => {
        onSaveDraftDetail(plu, eq);
    };

    const handleDeleteDraftDetail = (id: number) => {
        onDeleteDraftDetail(id);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.id === "search-filter") {
            //   setSearchFilter(event.currentTarget.value);
            let inputValue = event.currentTarget.value;
            setTimeout(() => {
                setSearchFilter(inputValue);
            }, 1000);
        }
    };

    useEffect(() => {
        onFilter(searchFilter);
    }, [searchFilter]);

    // //nilai_vh = (nilai_px / ukuran_viewport_height) x 100%;
    // // console.log("ini adalah tags", window.innerHeight);
    // const vh = (547 / window.innerHeight ) * 100;
    // console.log("ini view vh",vh);
    const vh = (547 / window.innerHeight) * 100;
    return (
      <>
        <Box
          sx={{
                    height: "20%",
                }}
        >
          <Grid
            xs={12}
            sx={{
                        paddingTop: "10px",
                    }}
          >
            {/* <Loading isLoading={isLoading} /> */}
            <Typography fontWeight="bold">
              List Penerimaan Barang DC
            </Typography>
          </Grid>
          <Grid
            xs={12}
            sx={{
                        paddingTop: "10px",
                        alignContent: "center",
                        marginBottom: "10px",
                    }}
          >
            <TextField
              label="Pencarian"
              id="search-filter"
              onChange={handleChange}
              sx={{ m: 0 }}
              InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <IconButton>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                        }}
              disabled={isLoading}
              fullWidth
            />
          </Grid>
        </Box>
        <Box
          sx={{
                    maxHeight: "80%",
                    height: "80%",
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
                            height: `${vh}vh`,
                            bgcolor: "background.paper",
                            overflow: "scroll",
                            borderRadius: "10px",
                        }}
            >
              {pbdcs?.map((value) => (
                <>
                  <LsiListItem
                    key={value.nopb}
                    id={value.nopb}
                    title={`No PB: ${value.nopb} - ${value.tgl}`}
                    subtitle={`Tipe: ${value.tipe} | DC: ${value.dc} | Nilai: ${value.nilai}`}
                    onDelete={(id: number): void => {
                                            alert("deleting");
                                        }}
                  />
                  <Divider variant="inset" component="li" />
                </>
                            ))}
            </List>
          </Grid>
        </Box>
        <PdbcDetailModal
          isLoading={false}
          pbdc={pbdcDraft}
          onClose={handleCloseModal}
          isOpen={openModal}
          onSave={handleSave}
          onSaveDraftDetail={handleSaveDraftDetail}
          onDeleteDraftDetail={handleDeleteDraftDetail}
        />
        <Fab
          color="success"
          aria-label="add"
          onClick={handleCreateNew}
          sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 16,
                    zIndex: 100,
                }}
        >
          <AddIcon />
        </Fab>
        {/* <Snackbar open={isOpenAlert} autoHideDuration={6000} onClose={() => {
                setOpenMessage(false);
            }}>
                <Alert onClose={hideAlert} severity="success" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar> */}
      </>
    );
};

export default withAuth(Pbdc);
