/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { Html5QrcodeScannerConfig } from 'html5-qrcode/html5-qrcode-scanner';
import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from 'react';

// 'html5qr-code-full-region'
const qrcodeRegionId = 'html5qr-code-full-region';

interface Props {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: () => void;
  qrCodeErrorCallback?: () => void;
  openScanner : boolean
}

const createConfig = (props: Props): Html5QrcodeScannerConfig => {
  const config: Html5QrcodeScannerConfig = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const PluginScanner: React.FC<Props> = (props: Props) => {
  const handleActive = (html5QrcodeScanner:Html5QrcodeScanner) => {
    if (props.openScanner) {
      html5QrcodeScanner.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback,

      );
    } else {
      html5QrcodeScanner.clear();
    }
  };
  useEffect(() => {
    // when component mounts
    const config: Html5QrcodeScannerConfig = createConfig(props);
    const verbose = props.verbose === true;
    // Success callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw new Error('qrCodeSuccessCallback is a required callback.');
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose,
    );
    // cleanup function when component will unmount4
    handleActive(html5QrcodeScanner);
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, [props.openScanner]);

  return (
    <div id={qrcodeRegionId} />
  );
};

export default PluginScanner;
