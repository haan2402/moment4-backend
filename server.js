//applikation för at hantera inloggning

const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//routing
app.use("/api", authRoute);

//skyddad router
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "skyddad route"});
});

//validerar token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //detta är token

    //om inte token skickas med - felmeddelande
    if(token == null) res.status(401).json({message: "Ingen behörighet för route - ingen token"});

    //om token är korrekt så blir det next och skickad till skyddad token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Ogiltig JWT"});

        req.user = user;
        next();
    })
}

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