/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserMultiFormatReader,
  NotFoundException,
  ChecksumException,
  FormatException,
  DecodeHintType,
  BarcodeFormat,
} from '@zxing/library';

export default function BarcodeScanner() {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [code, setCode] = useState('');
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const hints = new Map();
  const formats = [
    // BarcodeFormat.CODE_128,
    // BarcodeFormat.DATA_MATRIX,
    // BarcodeFormat.QR_CODE,
    BarcodeFormat.CODABAR,
    // BarcodeFormat.CODE_39,
    // BarcodeFormat.CODE_128,
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  hints.set(DecodeHintType.TRY_HARDER, true);
  const codeReader = new BrowserMultiFormatReader(hints);

  function setupDevices(videoInputDevices) {
    const sourceSelect = document.getElementById('sourceSelect');
    // selects first device
    setSelectedDeviceId(videoInputDevices[0].deviceId);
    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  }

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function resetClick() {
    codeReader.reset();
    setCode('');
    console.log('Reset.');
  }

  function decodeContinuously(selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      'video',
      (result, err) => {
        if (result) {
          console.log('Found QR code!', result.text);
          setCode(result.text);
        }

        if (err) {
          setCode('');
          console.error(err);
        }
      },
    );
  }

  useEffect((deviceId) => {
    decodeContinuously(selectedDeviceId);
    console.log(`Started decode from camera with id ${selectedDeviceId}`);
  }, []);

  return (
    <main class="wrapper">
      <section className="container" id="demo-content">
        <div id="sourceSelectPanel">
          <label for="sourceSelect">Change video source:</label>
          <select
            id="sourceSelect"
            onChange={() => setSelectedDeviceId(sourceSelect.value)}
          >
            {videoInputDevices.map((element) => (
              <option value={element.deviceId}>{element.label}</option>
            ))}
          </select>
        </div>

        <div>
          <video id="video" width="100%" height="720px" />
        </div>

        <label>Result:</label>
        <pre>
          <code id="result">{code}</code>
        </pre>

        <button id="resetButton" onClick={() => resetClick()}>
          Reset
        </button>
      </section>
    </main>
  );
}
