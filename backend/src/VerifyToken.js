const jwt = require("jsonwebtoken");

// Modified: Using CommonJS syntax
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                return res.sendStatus(403);
            } else {
                console.log("Decoded token:", authData);
                req.userid = authData.id;
                next();  // Moved inside the callback to ensure async flow
            }
        });
    } else {
        res.sendStatus(403);
    }
};

// Export the function as a module
module.exports = { verifyToken };
