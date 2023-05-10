import { Loading } from "@/components/Loading";
import { PbdcDetailEntity } from "@/src/domain/entity/pbdc-entity";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";

type ModalProps = {
    isLoading: boolean;
    isOpen: boolean;
    pbdcDetail?: PbdcDetailEntity;
    onSaveDraftDetail: (plu: string, eq: number) => void;
    onClose: () => void;
};

const PdbcFormModal: FC<ModalProps> = ({
    isLoading,
    isOpen,
    pbdcDetail,
    onSaveDraftDetail,
    onClose,
}) => {
    const [plu, setPlu] = useState<string>("");
    const [eq, setEq] = useState<string>("");

    const handleSaveDraftDetail = () => {
        if (plu.trim() === "") {
            alert("PLU harus diisi!");
        } else if (eq.trim() === "") {
            alert("Eq harus diisi!");
        } else {
            onSaveDraftDetail(plu, +eq);
            onClose();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.id === "plu") {
            setPlu(event.currentTarget.value);
        }

        if (event.currentTarget.id === "eq") {
            setEq(event.currentTarget.value);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Dialog open={isOpen} fullWidth>
                <DialogTitle
                    sx={{
                        paddingBottom: "0px",
                    }}
                >
                    <Typography gutterBottom>Tambah/Edit Barang</Typography>
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
                                id="plu"
                                label="PLU"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                value={pbdcDetail?.plu}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                size="small"
                                id="eq"
                                label="Eq"
                                type="text"
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                value={pbdcDetail?.eq}
                            />
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
                            handleSaveDraftDetail();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export { PdbcFormModal };
