/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PluginScanner from './PluginScanner';
import { BasicModal } from '../modals';

function ScannerBasic() {
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const onNewScanResult = (decodedText:any, decodedResult:any) => {
    setShow(true);
    setData(decodedText);
  };

  const onError = (err:any) => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <QrCodeScannerIcon />
      </IconButton>
      <BasicModal open={open}>
        <Box style={{
          height: !show ? '300px' : '',
        }}
        >
          <Box sx={{
            height: !show ? '137px' : '250px',
            overflow: 'hidden',
          }}
          >
            <PluginScanner
              fps={10}
              qrbox={500}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
              qrCodeErrorCallback={onError}
              openScanner={open}
            />
          </Box>
          {show
        && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button onClick={() => onClose()} variant="contained" color="error">Stop</Button>
        </Box>
        )}
        </Box>
      </BasicModal>
    </>
  );
}

export default ScannerBasic;
