//routing för autentisering

const express = require("express");
const router = express.Router();
const User = require("../models/User");

//lägger till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password, fullname, email } = req.body;

        //validering av input värden
        if(!username || !password || !fullname || !email) {
            return res.status(400).json({error: "Ogiltig inmatning, alla fält måste fyllas i!"});
        }

        //kontroll om användare redan finns
        const alreadyUser = await User.findOne({username});
        if(alreadyUser) {
            return res.status(400).json({error:"Denna användare finns redan..."});
        }

        //korrekt registrering av användare
        const user = new User({ username, password, fullname, email });
        await user.save();

        //korrekta värden
        res.status(201).json({message: "Användare skapad!"});

    } catch (error) {
        res.status(500).json({error: "Error with server, register"});
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