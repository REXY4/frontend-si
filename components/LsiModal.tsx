import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { FC } from "react";

type LsiModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LsiModal: FC<LsiModalProps> = ({ isOpen, onClose }) => (
  <div>
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>Penerimaan Barang DC</DialogTitle>
      <DialogContent>
        <DialogContentText>Lorem ipsum</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
                            onClose();
                        }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
    );

export { LsiModal };
