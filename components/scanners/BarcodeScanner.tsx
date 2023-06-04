/* eslint-disable react/function-component-definition */
import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';
import styles from '@/styles/components/scanner/barcode.module.css';

interface ScannerProps {
  onDetected:any
  onClose:any
}

export const config = {
  inputStream: {
    name: 'Live',
    type: 'LiveStream',
    target: '#video-container',
  },
  decoder: {
    readers: ['code_128_reader', 'ean_reader'],
  },
};

export function clearScanner() {
  // Stop the video stream and barcode recognition
  Quagga.stop();
  // Re-initialize Quagga with new configurations
  Quagga.init(config, (err) => {
    if (err) {
      //
    }
    // Start the video stream and barcode recognition
    Quagga.start();
  });
}

export const BarcodeScanner = ({ onDetected, onClose }:ScannerProps) => {
  const videoRef = useRef < HTMLVideoElement >(null);
  useEffect(() => {
    Quagga.init(
      config,
      (err:any) => {
        if (err) {
          return;
        }
        Quagga.start();
      },
    );

    Quagga.onDetected((result:any) => {
      onDetected(result.codeResult.code);
      Quagga.stop();
      onClose(false);
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div className={`${styles.barcode} ${styles.boxs}`}>
      <div id="video-container">
        <video ref={videoRef} style={{ width: '100%', height: "250px" }} />
      </div>
    </div>
  );
};
