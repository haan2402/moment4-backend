//applikation för at hantera inloggning

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//routing
app.use("/api", authRoute);

//ansluter till MongoDB databas
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.log("Går inte att ansluta till databas: " + error);
});

//model för user
const User = require("./models/User");

//startar applikation
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});