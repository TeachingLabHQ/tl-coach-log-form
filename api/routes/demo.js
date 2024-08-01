const express = require("express");
const router = express.Router();
const db = require("./firebase");
var fetch = require("node-fetch");

const { getDocs, collection } = require("firebase/firestore");
const fs = require("fs").promises;
const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { version } = require("os");
const { JWT } = require("google-auth-library");
require("dotenv").config();

//firebase-not currently using
router.get("/info", async (req, res, next) => {
  const allDocData = [];
  console.log(req.query.myParam);
  const docs = await getDocs(collection(db, req.query.myParam));
  docs.forEach((doc) => allDocData.push(doc.data()));
  res.json({ result: allDocData });
});

//get data from Monday
router.post("/getMonday", async (req, res, next) => {
  fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
      "API-Version": "2024-04",
    },
    body: JSON.stringify({
      query: req.body.query,
      // 'variables' : JSON.stringify(req.body.vars)
    }),
  })
    .then((res) => res.json())
    .then((result) => res.status(200).send(result));
  // .then(res => console.log(JSON.stringify(res, null, 2)));
});
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
//get data from google shet
router.post("/getDistrictSchool", async (req, res, next) => {
  console.log(process.env.GOOGLE_SERVICE_CLIENTEMAIL);
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_CLIENTEMAIL,
    key: process.env.GOOGLE_SERVICE_PRIVATEKEY,
    scopes: SCOPES,
  });
  const googleSheets = google.sheets({ version: "v4", auth });
  const data = await googleSheets.spreadsheets.values.get({
    spreadsheetId: "11jlo9UeWxZGwunhDb24hZBwAKc5b8ZKM9AYNWZaUyZY",
    range: "FY25 School/District Selection for Sites!A:Z",
    majorDimension: "COLUMNS",
  });
  const rows = data.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return res.status(500);
  }
  return res.status(200).send(rows);
});

//upload data to Monday
router.post("/boardUpdate", async (req, res, next) => {
  fetch("https://api.monday.com/v2", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDI2ODE2OCwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMy0wMi0wM1QwMDozNjoyMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.oM37gRdrLf8UnnmuZIM-QWDRoT_GtgFLLyHpvnxGUtQ",
      "API-Version": "2024-04",
    },
    body: JSON.stringify({
      query: req.body.query,
      variables: JSON.stringify(req.body.vars),
    }),
  })
    .then((res) => res.json())
    .then((result) => res.status(200).send(result));
  // .then(res => console.log(JSON.stringify(res, null, 2)));
});

module.exports = router;
