"use client"
/* import BarcodeReader from 'react-barcode-reader' */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function BarcodeScanner({
  onScan,
  onError,
  onReceive,
  onKeyDetect,
  timeBeforeScanTest = 100,
  avgTimeByChar = 30,
  minLength = 6,
  endChar = [9, 13],
  startChar = [],
  scanButtonKeyCode,
  scanButtonLongPressThreshold = 3,
  onScanButtonLongPressed,
  stopPropagation = false,
  preventDefault = false,
  testCode,
}: any) {
  const [firstCharTime, setFirstCharTime] = useState(0);
  const [lastCharTime, setLastCharTime] = useState(0);
  const [stringWriting, setStringWriting] = useState('');
  const [callIsScanner, setCallIsScanner] = useState(false);
  const [testTimer, setTestTimer] = useState(false);
  const [scanButtonCounter, setScanButtonCounter] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      const target = e.target;
      if (target instanceof window.HTMLElement && isInput(target)) {
        return;
      }

      if (scanButtonKeyCode && e.which === scanButtonKeyCode) {
        setScanButtonCounter((prevCounter) => prevCounter + 1);
        e.preventDefault();
        e.stopImmediatePropagation();
      }

      if (onKeyDetect) onKeyDetect(e);
      if (stopPropagation) e.stopImmediatePropagation();
      if (preventDefault) e.preventDefault();

      if (firstCharTime && endChar.includes(e.which)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setCallIsScanner(true);
      } else if (!firstCharTime && startChar.includes(e.which)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setCallIsScanner(false);
      } else {
        if (typeof e.which !== 'undefined') {
          setStringWriting((prevString) => prevString + String.fromCharCode(e.which));
        }
        setCallIsScanner(false);
      }

      if (!firstCharTime) {
        setFirstCharTime(Date.now());
      }
      setLastCharTime(Date.now());

      /* if (testTimer) clearTimeout(testTimer); */
      /* if (callIsScanner) {
        scannerDetectionTest();
        setTestTimer(false);
      } else {
        setTestTimer(setTimeout(scannerDetectionTest, timeBeforeScanTest));
      } */

      if (onReceive) onReceive(e);
    };

    function scannerDetectionTest() {
      if (stringWriting.length >= minLength && lastCharTime - firstCharTime < stringWriting.length * avgTimeByChar) {
        if (onScanButtonLongPressed && scanButtonCounter > scanButtonLongPressThreshold) {
          onScanButtonLongPressed(stringWriting, scanButtonCounter);
        } else if (onScan) {
          onScan(stringWriting, scanButtonCounter);
        }
        initScannerDetection();
        return true;
      }

      let errorMsg = '';
      if (stringWriting.length < minLength) {
        errorMsg = `String length should be greater or equal ${minLength}`;
      } else if (lastCharTime - firstCharTime > stringWriting.length * avgTimeByChar) {
        errorMsg = `Average key character time should be less or equal ${avgTimeByChar}ms`;
      }

      if (onError) onError(stringWriting, errorMsg);
      initScannerDetection();
      return false;
    };

    const initScannerDetection = () => {
      setFirstCharTime(0);
      setLastCharTime(0);
      setStringWriting('');
      setScanButtonCounter(0);
    };

    if (inIframe()) {
      window.parent.document.addEventListener('keypress', handleKeyPress);
    }
    window.document.addEventListener('keypress', handleKeyPress);

    return () => {
      if (inIframe()) {
        window.parent.document.removeEventListener('keypress', handleKeyPress);
      }
      window.document.removeEventListener('keypress', handleKeyPress);
    };
  }, [
    avgTimeByChar,
    endChar,
    firstCharTime,
    lastCharTime,
    minLength,
    onError,
    onKeyDetect,
    onReceive,
    onScan,
    onScanButtonLongPressed,
    preventDefault,
    scanButtonCounter,
    scanButtonKeyCode,
    scanButtonLongPressThreshold,
    startChar,
    stopPropagation,
    testTimer,
    timeBeforeScanTest,
  ]);

  /* useEffect(() => {
    if (testCode) {
      scannerDetectionTest(testCode);
    }
  }, [scannerDetectionTest, testCode]); */

  return null;
}

BarcodeScanner.propTypes = {
  onScan: PropTypes.func,
  onError: PropTypes.func,
  onReceive: PropTypes.func,
  onKeyDetect: PropTypes.func,
  timeBeforeScanTest: PropTypes.number,
  avgTimeByChar: PropTypes.number,
  minLength: PropTypes.number,
  endChar: PropTypes.arrayOf(PropTypes.number),
  startChar: PropTypes.arrayOf(PropTypes.number),
  scanButtonKeyCode: PropTypes.number,
  scanButtonLongPressThreshold: PropTypes.number,
  onScanButtonLongPressed: PropTypes.func,
  stopPropagation: PropTypes.bool,
  preventDefault: PropTypes.bool,
  testCode: PropTypes.string,
};

function isInput(element: any) {
  if (!element) {
    return false;
  }
  const tagName = element.tagName;
  const editable = isContentEditable(element);
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || editable;
}

function isContentEditable(element: any) {
  if (typeof element.getAttribute !== 'function') {
    return false;
  }
  return !!element.getAttribute('contenteditable');
}

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}



function page() {
  return (
    <div className="p-4">
      <BarcodeScanner
        onScan={(d) => { console.log(d) }}
        onError={(e) => { console.log(e) }}
        onKeyDetect={(k) => { console.log("event",k) }}
        onReceive={(r) => { console.log("receive",r) }}
        onScanButtonLongPressed={(s, c) => { console.log(s, c) }}

      />
    </div>
  )
}
export default page