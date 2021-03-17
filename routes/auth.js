const express = require('express');
const router = module.exports = express()
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');
const { saveToken, findToken, deleteToken } = require('../tokenRepo');
const Token = require('../models/Token');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

router.post('/register', async (req, res) => {

    // validate user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists!');

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
    });

    try {
        const savedUser = await user.save();
        res.status(201).send({ user: savedUser._id });
    } catch (err) {
        res.status(404).send(err);
    }
});

router.delete('/delete', verifyToken, async (req, res) => {

    await User.deleteMany({ _id: req.user._id }, (err, result) => {
        if (err)
            res.status(400).send(err);
        else
            res.send(result);
    });
});

router.post('/login', async (req, res) => {

    // validate user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(401).send('Password is wrong!');

    // create jwt
    let userJwt = { id: user.id, name: user.name }
    const accessToken = generateAccessToken(userJwt)
    const refreshToken = jwt.sign(userJwt, process.env.REFRESH_TOKEN_SECRET);

    saveToken(refreshToken)

    res.json({ accessTokes: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

router.post('/token', async (req, res) => {

    // destroy jwt refresh token
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)
    const storedToken = await findToken(refreshToken)
    if (storedToken == null) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ id: user.id, name: user.name })
        return res.json({ accessToken: accessToken })
    })

});

router.delete('/logout', async (req, res) => {

    // destroy jwt refresh token stored in mongodb
    deleteToken(req.body.token)
    res.status(200).send('User logged out');
});

module.exports = router;