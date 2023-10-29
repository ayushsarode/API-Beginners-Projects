import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../components/style.css";

const QRScanner = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Creating a default scanner from HTML5QrcodeScanner package
    let scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        // To set the width and height of the scanner
        qrbox: { width: 600, height: 600 },
      },
      
    );

    scanner.render(onScanSuccess);

    function onScanSuccess(decodedText, decodedResult) {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setData(decodedText);
      scanner.clear();
    }
  },[]);

  return (
    <div className="App">
      <h1> React QR Code Scanner </h1>
      <div id="reader" width="300px" height="300px"></div>
      {data && <h2>Success: <a href={data}>{data}</a></h2>}
    </div>
  );
};

export default QRScanner;
