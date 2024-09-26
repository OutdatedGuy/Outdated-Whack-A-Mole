require("dotenv").config();
const express = require("express");
const app = express();
const { initializeServerApp } = require("firebase/app");
const { getDatabase, ref, push, get, } = require("firebase/database");

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const firebaseApp = initializeServerApp(firebaseConfig, {});

const firebaseDB = getDatabase(firebaseApp);

const port = process.env.PORT || 1412;
app.listen(port, () => console.log(`Starting server at ${port}`));

app.use(express.static('public'));
app.use(express.json({ limit: '200b' }));

app.post('/getTheScore', async (_req, res) => {
  console.log("I Got A Request To Send Data!!");

  const [lvl1Data, lvl2Data] = await Promise.all([
    get(ref(firebaseDB, "Outdated Game/Whack-A-Mole Game/Level 1")),
    get(ref(firebaseDB, "Outdated Game/Whack-A-Mole Game/Level 2")),
  ]);

  res.json({
    lvl1: Object.values(lvl1Data.val()),
    lvl2: Object.values(lvl2Data.val()),
  });
});

app.post('/api', async (request, response) => {
  console.log("I Got A Request To Add Data!!");
  var data = {
    name: request.body.name.substr(0, 15),
    score: request.body.score
  };

  if (request.body.level == 1) {
    await push(ref(firebaseDB, "Outdated Game/Whack-A-Mole Game/Level 1"), data);
  } else if (request.body.level == 2) {
    await push(ref(firebaseDB, "Outdated Game/Whack-A-Mole Game/Level 2"), data);
  } else {
    console.log("Data Adding Failed :(")
    response.end();
    return;
  }
  console.log("Data Added To Firebase Successfully!!");
  response.end();
});
