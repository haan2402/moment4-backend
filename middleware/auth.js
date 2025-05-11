
const jwt = require("jsonwebtoken");

//validerar token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //detta är token

    //om inte token skickas med - felmeddelande
    if(token == null) {
        return res.status(401).json({message: "Ingen behörighet för route - ingen token"});
    } 

    //om token är korrekt så blir det next och skickad till skyddad token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({message: "Ogiltig JWT"});
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;