import React, { useState } from 'react';
import { IconButton, Box } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import Quagga from 'quagga';
import { ModalBasic } from '../modals';
import { BarcodeScanner, clearScanner } from './BarcodeScanner';

interface Props {
  onDetected : (result:any) => void;
}

export default function ModalScanner({ onDetected }:Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    clearScanner();
    setOpen(false);
  };
  return (
    <Box>
      <IconButton onClick={() => setOpen(true)}>
        <QrCodeScannerIcon />
      </IconButton>
      <ModalBasic open={open} onClose={() => handleClose()}>
        <BarcodeScanner onDetected={onDetected} onClose={setOpen} />
      </ModalBasic>
    </Box>
  );
}
