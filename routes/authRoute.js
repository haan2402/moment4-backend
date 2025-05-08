//routing för autentisering

const express = require("express");
const router = express.Router();

//lägger till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password, fullname, email } = req.body;

        //validering av input värden
        if(!username || !password || !fullname || !email) {
            return res.status(400).json({error: "Ogiltig inmatning, alla fält måste fyllas i!"});
        }

        //korrekta värden
        res.status(201).json({message: "Användare skapad!"});

    } catch (error) {
        res.status(500).json({error: "Error with server"});
    }
});

//för inloggning
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //validering av input värden
        if(!username || !password) {
            return res.status(400).json({error: "Ogiltig inmatning, alla fält måste fyllas i!"});
        }

        //kollar om det är giltiga värden
        if(username === "hanna" && password === "password") {
            res.status(200).json({message: "Inloggning lyckades!"});
        } else {
            res.status(401).json({error: "Ogiltigt användarnamn/lösenord"});
        }

    } catch (error) {
        res.status(500).json({error: "Error with server"});
    }
});

module.exports = router;