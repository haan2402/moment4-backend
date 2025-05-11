//applikation för at hantera inloggning

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const authenticateToken = require("./middleware/auth");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:1234'],
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//routing
app.use("/api", authRoute);

//skyddad router
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "skyddad route"});
});


//ansluter till MongoDB databas
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.log("Går inte att ansluta till databas: " + error);
});

//startar applikation
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
});

