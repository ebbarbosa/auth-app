const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');


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

router.delete('/:id', async (req, res) => {
    await User.deleteMany({ _id: req.body.id }, (err, result) => {
        if (err)
            res.status(400).send(err);
        else
            res.send(result);
    });
})

router.post('/login', async (req, res) => {

    // validate user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email does not exist!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        res.status(204).send('Password is wrong!');

    res.send(user._id);
});

module.exports = router;