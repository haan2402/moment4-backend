//applikation för at hantera inloggning

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//startar applikation
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});