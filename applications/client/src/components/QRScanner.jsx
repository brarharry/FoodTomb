import React, { useState } from "react";
import { Fab, TextareaAutosize } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import Navbar from "./Navbar-user";
import "../styles/QRScanner.css";

function QRscanner() {
  const [qrscan, setQrscan] = useState("No result");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Link to="/refrigerator">
        <Fab style={{ marginRight: 10 }} color="success">
          <ArrowBack />
        </Fab>
      </Link>
      <span>Food List</span>

      <center>
        <div style={{ marginTop: 30 }}>
          <QrReader
            id="qr_reader"
            delay={300}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </center>

      <TextareaAutosize
        style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
        rowsMax={4}
        defaultValue={qrscan}
        value={qrscan}
      />
    </div>
  );
}

export default QRscanner;
