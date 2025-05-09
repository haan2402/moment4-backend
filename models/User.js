const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//skapar ett schema för ny användare
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Användarnamn måste fyllas i!"]
    },
    password: {
        type: String,
        required: [true, "Ett lösenord måste fyllas i!"]
    },
    fullname: {
        type: String,
        required: [true, "Ditt fullständiga namn måste fyllas i!"]
    },
    email: {
        type: String,
        required: [true, "Din email måste fyllas i!"]
    },
    account_created: {
        type: Date,
        default: Date.now
    }
});

//funktion för hash password
usersSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch(error) {
        next(error);
    }
});

//registrerar ny användare
usersSchema.statics.register = async function (username, password, fullname, email) {
    try {
        const user = new this({username, password, fullname, email}); //denna data som skickas in för att skapa ny användare

        //sparar sedan den nya användaren i databasen
        await user.save();

        //och sedan returnerar den nya användaren
        return user;
    } catch(error) {
        //kastar om det blir något fel
        throw error; 
    }
};

//jämför hashedpassword
usersSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

    } catch(error) {
        //kastar om det blir något fel
        throw error; 
    }
}

//inloggning för användaren
usersSchema.statics.login = async function(username, password) {
    try {
        const user =  await this.findOne({ username });

        if(!user) {
            throw new Error("Fel användarnamn/lösenord");
        }

        //kontrollerar om lösenordet matchar
        const passwordMatch = await user.comparePassword(password);

        //inkorrekt lösenord
        if(!passwordMatch) {
            throw new Error("Fel användarnamn/lösenord");
        }

        //korrekt, returnerar
        return user;

    }catch(error) {
        //kastar om det blir något fel
        throw error; 
    }
}

const User = mongoose.model("User", usersSchema);
module.exports = User;