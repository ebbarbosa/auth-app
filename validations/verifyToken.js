const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1]
    if (token == null) return res.status(401).send('No token defined');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};