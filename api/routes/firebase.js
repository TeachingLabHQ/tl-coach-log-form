const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const serviceAccount = require("../permission.json");

const app = initializeApp(serviceAccount);
const db = getFirestore(app);

module.exports = db;
